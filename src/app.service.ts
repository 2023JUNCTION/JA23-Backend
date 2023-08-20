import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';
import { Coach } from './schemas/coaches.schema';
import { Model } from 'mongoose';
import { AuthService } from './auth/auth.service';
import { Menu } from './schemas/menus.schema';
import { Combo } from './schemas/combos.schema';

@Injectable()
export class AppService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Coach.name) private coachModel: Model<Coach>,
    @InjectModel(Menu.name) private menuModel: Model<Menu>,
    @InjectModel(Combo.name) private comboModel: Model<Combo>,
    private readonly authService: AuthService) { }

  async getUsers(): Promise<User[]> {
    return this.userModel.find()
  }

  async getMenus(): Promise<Menu[]> {
    return this.menuModel.find()
  }


  async getUserCombo(userid: string, day: string): Promise<Combo[]> {
    const user = await this.userModel.findOne({ userid })
    if (!user) {
      return null
    }
    let result: Combo[] = [undefined, undefined, undefined];
    for (const vvv of user.assigned_combos.filter((val) => val.day === day)) {
      result[vvv.mealtime - 1] = vvv.combo

    }
    return result
  }

  async setUserCombo(userid: string, day: string, combo: Combo, mealtime: number): Promise<any> {
    const usersmeal = await this.getUserCombo(userid, day)
    if (!usersmeal) {
      return null
    }
    const insertedmeal = new this.comboModel(combo)
    await insertedmeal.save()
    const meal = await this.userModel.updateOne({ userid }, {
      $pull: {
        assigned_combos: { day, mealtime, combo: combo }
      }
    });
    await this.userModel.updateOne({ userid }, {
      $push: {
        assigned_combos: { day, mealtime, combo: insertedmeal }
      }
    });

    return await this.getUserCombo(userid, day)
  }

  async setComboByTags(tags: string[], day: string, combo: Combo, mealtime: number) {
    combo.tags = tags
    await this.userModel.updateMany({ meal_tag: { $all: tags } }, { $pull: { assigned_combos: { day, mealtime } } })
    await this.userModel.updateMany({ meal_tag: { $all: tags } }, { $push: { assigned_combos: { day, mealtime, combo } } })

  }

  async makeComboFromMenus(menus: string[]) {

    const menumenu = await this.menuModel.find({ menu_title: { $in: menus } });
    let calories = 0, carbohydrates = 0, protein = 0, fat = 0, saturated_fat = 0, trans_fat = 0, cholesterol = 0, sodium = 0, sugar = 0, calcium = 0, iron = 0, potassium = 0, vit_D = 0, dietary_fiber = 0;

    for (let mme of menumenu) {
      calories += mme.calories;
      carbohydrates += mme.carbohydrates;
      protein += mme.protein;
      fat += mme.fat;
      saturated_fat += mme.saturated_fat;
      trans_fat += mme.trans_fat;
      cholesterol += mme.cholesterol;
      sodium += mme.sodium;
      sugar += mme.sugar;
      calcium += mme.calcium;
      iron += mme.iron;
      potassium += mme.potassium;
      vit_D += mme.vit_D;
      dietary_fiber += mme.dietary_fiber;
    }

    return new this.comboModel({ menus: menumenu, calories, carbohydrates, protein, fat, saturated_fat, trans_fat, cholesterol, sodium, sugar, calcium, iron, potassium, vit_D, dietary_fiber });
  }

}
