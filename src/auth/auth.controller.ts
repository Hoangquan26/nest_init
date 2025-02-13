import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UsersService,
        private authService: AuthService
    ) {
    }

    @Post('signup')
    signup(
        @Body() userDTO: CreateUserDTO
    ) {
        try {
            return this.userService.createUser(userDTO);
        }
        catch (error) {
            return error;
        }
    }

    @Post('login')
    login(
        @Body() loginDTO: LoginUserDto
    )
    {
        try {
            return this.authService.login(loginDTO)
        }
        catch (error) {
            return error
        }
    }
}
