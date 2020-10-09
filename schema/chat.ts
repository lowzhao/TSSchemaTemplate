import { Ref } from './../server/route/gql';
import { User } from './user';
import { prop } from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';
import { BaseClass } from './baseClass';
import _ from '@typegoose/typegoose';

@ObjectType()
export class Chat extends BaseClass
{
	@Field(type => User) @prop({ ref: User, immutable: true }) author: Ref<User>;
	@Field() @prop({ immutable: true }) text: string;
}
