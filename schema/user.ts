import { Ref } from './../server/route/gql';
import { prop } from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';
import { BaseClass } from './baseClass';

@ObjectType()
export class User extends BaseClass
{
	@Field() @prop({ unique: true }) name: string;
	@Field() @prop() color: string;
	@Field(_ => [User]) @prop({ ref: () => User }) friends: User[];
	@prop() hashedPassword: string;
	@prop() session: string;
}