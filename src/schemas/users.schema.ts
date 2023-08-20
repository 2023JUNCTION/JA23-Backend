import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Combo, ComboSchema } from './combos.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop()
    userid: string;

    @Prop()
    password: string;

    @Prop()
    username: string;

    @Prop()
    birthday: String;

    @Prop({ default: -1 })
    age: number;

    @Prop({ default: -1 })
    tall: number;

    @Prop({ default: -1 })
    weight: number;

    @Prop({ default: -1 })
    bmi: number;

    @Prop({ default: undefined })
    medicine: string;
    @Prop({ default: -1 })
    blood_press_sys: number;
    @Prop({ default: -1 })
    blood_press_dia: number;

    @Prop({ default: -1 })
    cholesterol: number;

    @Prop({ default: undefined })
    main_syndrome: string;

    @Prop({ type: Object, default: {} })
    health_other: Object;

    @Prop({ default: false })
    meal_restrict: boolean;

    @Prop()
    meal_tag: string[];

    @Prop({ type: [{ day: { type: String }, mealtime: { type: Number }, combo: { type: SchemaTypes.ObjectId } }] })
    assigned_combos: { day: string, mealtime: number, combo: Combo }[];

}

export const UserSchema = SchemaFactory.createForClass(User);
