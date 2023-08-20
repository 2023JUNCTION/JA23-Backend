import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { User, UserSchema } from './schemas/users.schema';
import { Coach, CoachSchema } from './schemas/coaches.schema';
import { Menu, MenuSchema } from './schemas/menus.schema';
import { Combo, ComboSchema } from './schemas/combos.schema';
import { Mongoose } from 'mongoose';

@Module({
  imports: [MongooseModule.forRoot("", {}), AuthModule,
  MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Coach.name, schema: CoachSchema }, { name: Menu.name, schema: MenuSchema }, { name: Combo.name, schema: ComboSchema }])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }