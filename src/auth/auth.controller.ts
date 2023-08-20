import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() body: { userid: string, password: string }) {
        const { user, usertype } = await this.authService.validateUser(body.userid, body.password);
        if (!user) {
            throw new Error('Invalid credentials');
        }
        if (usertype == 'coach') {
            return { token: await this.authService.generateCoachToken(user), usertype };
        }
        else return { token: await this.authService.generateToken(user), usertype };
    }
}