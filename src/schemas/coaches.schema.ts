import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { User } from './users.schema'

export type CoachDocument = HydratedDocument<Coach>;

@Schema()
export class Coach {
    @Prop()
    userid: string;

    @Prop()
    password: string;

    @Prop()
    username: string;

    @Prop()
    position: string;

    @Prop()
    managing_users: User[];
}

export const CoachSchema = SchemaFactory.createForClass(Coach);
