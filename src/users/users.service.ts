import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) 
        private userRepository: Repository<User>
    ) {}
    createUser = async(userDTO: CreateUserDTO) => {
        const hashedPassword = await bcrypt.hash(userDTO.password, 10);
        userDTO.password = hashedPassword;

        const user = await this.userRepository.save(userDTO);
        
        return {
            ...user,
            password: null
        }
    };
    
    async findOne(data: Partial<User>): Promise<User> {
        const user = await this.userRepository.findOneBy({ email: data.email });
        if (!user) {
        throw new UnauthorizedException('Could not find user');
        }
        return user;
    }
}
