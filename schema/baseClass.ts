import { ObjectId } from 'mongodb';
import { prop, pre, modelOptions } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
@modelOptions({ options: { allowMixed: 0 } })
@pre<BaseClass>(['find', 'findOne'], function(next) {
    if (!('deleted' in this.getQuery())) {
        this.where({deleted: false});
    }
    next();
})
@pre<BaseClass>('save', function(next) {
    this.lastUpdatedAt = new Date();
    if (this.deleted && !!this.deletedAt) {
        this.deletedAt = new Date();
    }
    next();
})
export abstract class BaseClass
{
    static userEditableFields: string[] = [];

    @Field() @prop({ immutable: true, default: new Date() }) createdAt: Date;
    @Field() @prop() lastUpdatedAt: Date;

    @Field() @prop({ default: false }) deleted: boolean;
    @NField() @prop({ default: null }) deletedAt: Date;
    
	@Field(type => ID) readonly _id: ObjectId;
}


export function NField(func: Function | any = undefined, extra: any = {}){
    if (func instanceof Function){
        return Field(func, {nullable: true, ...extra});
    } else {
        return Field({nullable: true, ...func, ...extra})
    }
}
