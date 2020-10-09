import { atob, btoa } from './../../utility/util';
import { ObjectId } from 'mongodb';
import { UserModel } from './resolvers/userResolver';
import type { User } from './../../schema/user';
import { compareHash, hash } from '../../utility/encrypt';
import { ApolloError, AuthenticationError } from 'apollo-server-express';
import { DocumentType } from '@typegoose/typegoose';

function addDays(date, days)
{
	var result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}

export async function getAuthUser(req): Promise<DocumentType<User> | null>
{
	const session = req.cookies.sess;
	if (!session)
	{
		return null;
	}

	let sessionInfo = JSON.parse(atob(session));

	const user = await UserModel.findById(sessionInfo.id);
	return user;
}

// Trying to resolve the type for this auth checker is very sophisticated, I suggest you find me.
export async function check(session): Promise<boolean>
{
	if (!session)
	{
		return false;
	}
	let sessionInfo = JSON.parse(atob(session));

	const user = await UserModel.findById(sessionInfo.id);

	if (!user)
	{
		return false;
	} else
	{
		if (user.session != '' && user.session == session &&
			(Date.now() - sessionInfo.date) / 1000 / 60 / 60 / 24 <= 7
		)
		{
			return true;
		} else
		{
			return false;
		}
	}
}

export const authChecker = (
	{ root, args, context, info },
	roles,
) =>
{
	return check(context.req.cookies.sess);
	// if (context.isUnauthenticated())
	// {
	// 	return false;
	// }

	// const currUser = <AuthType>context.getUser();
	// // console.log(currUser.type)
	// return roles
	// 	.map(
	// 		(role) =>
	// 		{
	// 			return currUser.type >= AuthLevel[role];
	// 		}
	// 	)
	// 	.reduce(
	// 		(x, y) => x || y,  // if any role is compatible it means he is compatible
	// 		false
	// 	);
};

export async function deauth(req, res)
{
	const user = await getAuthUser(req)
	if (!user)
	{
		return false;
	}
	user.session = '';
	user?.save();
	res.clearCookie("sess");
	return true;
}

export async function auth(name: string, password: string, req, res): Promise<User>
{
	let user = await UserModel.findOne(
		{
			name: name
		}
	);

	let cookieOptions = {
		maxAge: 1000 * 60 * 60 * 60, // would expire after 15 minutes
		httpOnly: true, // The cookie only accessible by the web server
		expires: addDays(new Date(), 4),
	}

	if (user)
	{
		if (!compareHash(password, user.hashedPassword))
		{
			throw new AuthenticationError('Unauthorized');
		}
	} else
	{
		user = new UserModel();
		user.name = name;
		user.hashedPassword = hash(password);
		user.color = 'red';
	}

	let userCookie = {
		id: user._id,
		// TODO: this is insecure use your own generation
		session: Math.random().toString().substr(2),
		date: Date.now()
	}

	user.session = btoa(JSON.stringify(userCookie))
	await user.save();

	res.cookie('sess', user.session, cookieOptions);
	return user;
}