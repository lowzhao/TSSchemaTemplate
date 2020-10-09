import { ObjectId } from 'mongodb';
import { User } from './../../../schema/user';
import { getModelForClass } from '@typegoose/typegoose';
import { Arg, Int, Mutation, Query, Resolver, Ctx, Authorized, Root, FieldResolver, Field, InputType } from "type-graphql";
import { hash } from '../../../utility/encrypt';
import { auth, deauth, getAuthUser } from '../auth';
import { NField } from '../../../schema/baseClass';


export const UserModel = getModelForClass(User);

@InputType()
class userInput {
    @NField() name?: string
    @NField() color?: string
    @NField(type => [ObjectId]) friends?: ObjectId[];
}


@Resolver(of => User)
export class UserResolver
{
    @Query(_returns => User, { nullable: true })
    async user(@Arg('_id') _id: string)
    {
        return await UserModel.findById(_id);
    }

    // @Authorized(['ADMIN', 'MODERATOR'])
    @Query(() => [User])
    async users()
    {
        return await UserModel.find();
    }


    @Mutation(() => User)
    async userCreate()
    {
        const user = new UserModel();
        await user.save();
        return user;
    }

    @Query(_ => Boolean)
    emitContext(@Ctx() context)
    {
        return true;
    }

    @Query(_ => User)
    async auth(
        @Arg('name') name: string,
        @Arg('password') password: string,
        @Ctx() context: any
    ): Promise<User>
    {
        return auth(name, password, context.req, context.res);
    }

    @Authorized()
    @Query(_ => User)
    async checkLogin(@Ctx() context: any) {
        return getAuthUser(context.req);
    }

    @Authorized()
    @Query(_ => Boolean)
    async signOut(@Ctx() context: any): Promise<Boolean> {
        return await deauth(context.req, context.res);
    }

    @FieldResolver(type => [User])
    async friends(@Root() root: User): Promise<User[]>
    {
        return UserModel.find({_id:{$in:root.friends}});
    }

    @Authorized()
    @Mutation(type => User)
    async userUpdate(
        @Arg('userInput') userInput: userInput,
        @Ctx() context
    ): Promise<User> {

        const user = (await getAuthUser(context.req))!;
        
        for (let userKey in userInput) {
            user[userKey] = userInput[userKey];
        }

        await user.save();

        return user;
    }

}
