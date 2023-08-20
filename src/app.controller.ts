import { Body, Controller, Get, Param, Query, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './schemas/users.schema';
import { Combo } from './schemas/combos.schema';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/users')
  async getUsers() {
    return await this.appService.getUsers();
  }

  @Get('/menus')
  async getMenus() {
    return await this.appService.getMenus()
  }

  @Get('/users/:id/combo')
  async getUsersCombo(@Param('id') userid: string, @Query('day') day: string) {
    return await this.appService.getUserCombo(userid, day)
  }

  @Post('/users/:id/combo')
  async setUsersCombo(@Param('id') userid: string, @Body('day') day: string, @Body('combo') combo: Combo, @Body('mealtime') mealtime: number) {
    await this.appService.setUserCombo(userid, day, combo, mealtime);
  }

  @Post('/tags/combo')
  async setTagsCombo(@Body('tags') tags: Array<string>, @Body('day') day: string, @Body('combo') combo: Combo, @Body('mealtime') mealtime: number) {
    await this.appService.setComboByTags(tags, day, combo, mealtime);
  }
  @Post('/combo')
  async makeCombo(@Body('menus') menus: Array<string>) {
    return await this.appService.makeComboFromMenus(menus);
  }

}
