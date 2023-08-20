import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Coach } from './coaches.schema'
import { Menu } from './menus.schema'
export type ComboDocument = HydratedDocument<Combo>;



@Schema()
export class Combo {
    @Prop()
    tags: string[];

    @Prop()
    created_by: Coach;

    @Prop()
    combo_title: string;

    @Prop()
    menus: Menu[];

    @Prop()
    calories: number;
    @Prop()
    carbohydrates: number;
    @Prop()
    protein: number;
    @Prop()
    fat: number;
    @Prop()
    saturated_fat: number;
    @Prop()
    trans_fat: number;
    @Prop()
    cholesterol: number;
    @Prop()
    sodium: number;
    @Prop()
    sugar: number;
    @Prop()
    calcium: number;
    @Prop()
    iron: number;
    @Prop()
    potassium: number;
    @Prop()
    vit_D: number;
    @Prop()
    dietary_fiber: number;
}

export const ComboSchema = SchemaFactory.createForClass(Combo);
