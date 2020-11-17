import { ObjectId } from 'mongodb';
import { User } from './../../../schema/user';
import { getModelForClass } from '@typegoose/typegoose';
import { Arg, Int, Mutation, Query, Resolver, Ctx, Authorized, Root, FieldResolver, Field, InputType } from "type-graphql";
import { auth, deauth, getAuthUser } from '../auth';
import { NField } from '../../../schema/baseClass';


export const UserModel = getModelForClass(User);

@InputType()
class UserInput
{
    @NField() name?: string
    @NField() color?: string
    @NField(type => [ObjectId]) friends?: ObjectId[];
}

@Resolver(of => User)
export class UserResolver
{
    @Query(_returns => User, { nullable: true })
    user(@Arg('_id') _id: ObjectId)
    {
        return UserModel.findById(_id);
    }

    @Query(() => [User])
    users()
    {
        return UserModel.find();
    }

    @Mutation(_ => User)
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
    async checkLogin(@Ctx() context: any)
    {
        return getAuthUser(context.req);
    }

    @Authorized()
    @Query(_ => Boolean)
    async signOut(@Ctx() context: any): Promise<Boolean>
    {
        return await deauth(context.req, context.res);
    }

    @Authorized()
    @Mutation(type => User)
    async userUpdate(
        @Arg('userInput') userInput: UserInput,
        @Ctx() context
    ): Promise<User>
    {
        const user = (await getAuthUser(context.req))!;

        if (userInput.color){
            user.color = userInput.color
        }

        await user.save();

        return user;
    }

    @FieldResolver(type => [User])
    async friends(@Root() root: User): Promise<User[]>
    {
        return UserModel.find({ _id: { $in: root.friends } });
    }
}
