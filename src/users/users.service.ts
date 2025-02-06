import { Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
    createUser = () => {};
    
    login = (loginUserDto: LoginUserDto) => {

    }

    registered = (registeredUserDto: LoginUserDto) => {

    }
}
