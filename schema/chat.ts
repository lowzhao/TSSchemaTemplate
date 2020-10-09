import { User } from './user';
import { prop } from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';
import { BaseClass } from './baseClass';
import _ from '@typegoose/typegoose';

@ObjectType()
export class Chat extends BaseClass
{
	@Field() @prop({ ref: User }) author: User;
	@Field() @prop() text: string;
}
