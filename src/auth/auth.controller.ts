import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator';
import { UsersService } from '../users/users.service';

@Public()
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private usersService: UsersService) {}

    @Post('signup')
    async signUp(@Body() { username, password }: { username: string; password: string }) {
        const newUser = await this.usersService.createUser(username, password);
        return this.authService.signIn(newUser.username, newUser.password);
    }
    
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
      return this.authService.signIn(signInDto.username, signInDto.password);
    }
}
