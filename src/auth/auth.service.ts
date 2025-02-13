import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ArtistsService } from 'src/artists/artists.service';
import { PayloadType } from 'src/types/payload.type';

@Injectable()
export class AuthService {  
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private artistService: ArtistsService
    ){}
    async login(loginDTO: LoginUserDto): Promise<{accessToken: string}> {
        const user = await this.userService.findOne(loginDTO);
        const matchedPassword = await bcrypt.compare(loginDTO.password, user.password)
        if(!matchedPassword) throw new UnauthorizedException('Password not match')
        const payload: PayloadType = { email: user.email, userId: user.id }

        const foundArtist = await this.artistService.findArtist(user.id)
        if(foundArtist) 
            payload.artistId = foundArtist.id   
        return {
            accessToken: this.jwtService.sign(payload)
        }
    }
}
