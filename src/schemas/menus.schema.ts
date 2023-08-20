import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MenuDocument = HydratedDocument<Menu>;

@Schema()
export class Menu {

    @Prop()
    tags: string[];

    @Prop()
    menu_title: string;
    @Prop()
    allergies: number[];

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

    @Prop()
    available: boolean;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
