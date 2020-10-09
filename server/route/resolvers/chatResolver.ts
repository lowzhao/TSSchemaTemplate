import { User } from './../../../schema/user';
import { UserResolver } from './userResolver';
import { Chat } from './../../../schema/chat';
import { ObjectId } from 'mongodb';
import { getModelForClass } from '@typegoose/typegoose';
import { Arg, Int, Mutation, Query, Resolver, Ctx, Authorized, Root, FieldResolver, Field, InputType } from "type-graphql";
import { auth, deauth, getAuthUser } from '../auth';
import { NField } from '../../../schema/baseClass';

export const ChatModel = getModelForClass(Chat);

@Resolver(of => Chat)
export class ChatResolver
{
	@Query(_returns => Chat, { nullable: true })
	async chat(@Arg('_id') _id: ObjectId)
	{
		return await ChatModel.findById(_id);
	}

	@Query(() => [Chat])
	async chats(
		@Arg('dateAfter', { nullable: true }) dateAfter: Date = new Date(0)
	)
	{
		return await ChatModel.find({
			createdAt: { $gt: dateAfter }
		});
	}

	@Authorized()
	@Mutation(() => Chat)
	async chatCreate(
		@Arg('text') text: string,
		@Ctx() context: any
	)
	{
		const chat = new ChatModel();
		chat.text = text
		chat.author = (await getAuthUser(context.req))!;
		await chat.save();
		return chat;
	}

	@FieldResolver(type => User)
	async author(
		@Root() root: Chat
	){
		return await (new UserResolver()).user(root.author as ObjectId);
	}


}
