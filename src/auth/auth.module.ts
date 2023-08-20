import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/users.schema';
import { Coach, CoachSchema } from '../schemas/coaches.schema';
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'alalallallalallaalaallalalalhjdfksj', // Replace with your own secret key
      signOptions: { expiresIn: '2h' }, // Adjust the token expiration as needed
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Coach.name, schema: CoachSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule { }
