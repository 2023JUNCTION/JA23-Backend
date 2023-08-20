import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../schemas/users.schema';
import { Coach } from '../schemas/coaches.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService, @InjectModel(User.name) private userModel: Model<User>, @InjectModel(Coach.name) private coachModel: Model<Coach>) { }

    async validateUser(userid: string, password: string): Promise<any> {

        const coach = this.coachModel.findOne({ userid: userid, password: password })
        const user = this.userModel.findOne({ userid: userid, password: password })
        if (coach || user) {
            return { user: coach, type: 'coach' }
        }
        else if (user) {
            return { user, type: 'recipent' }
        }
        return { undefined, type: 'recipent' }
    }

    async generateToken(user: any): Promise<string> {
        const payload = { sub: user.id, uid: user.userid, typ: 0 };
        return this.jwtService.signAsync(payload);
    }
    async generateCoachToken(coach: any): Promise<string> {
        const payload = { sub: coach.id, uid: coach.userid, typ: 1 };
        return this.jwtService.signAsync(payload);
    }
    async validateUserToken(token: string): Promise<boolean> {
        try {
            await this.jwtService.verifyAsync(token);
        } catch (e) {
            return false
        }
        if (this.jwtService.decode(token)['typ'] === 0)
            return true
        else return false;
    }
    async validateCoachToken(token: string): Promise<boolean> {
        try {
            await this.jwtService.verifyAsync(token);
        } catch (e) {
            return false
        }
        if (this.jwtService.decode(token)['typ'] === 1)
            return true
        else return false;
    }

}
