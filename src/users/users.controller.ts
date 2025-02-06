import { Body, Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService = new UsersService()) {}

    createUser() {
        return this.usersService.createUser();
    }

    login(@Body() loginUserDto: LoginUserDto) {
        return this.usersService.login(loginUserDto);
    }

    registered(@Body() registeredUserDto: LoginUserDto) {
        return this.usersService.registered(registeredUserDto);
    }


}
