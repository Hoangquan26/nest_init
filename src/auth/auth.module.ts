import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from './constant/auth.constant';
import { JWTStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JWTArtistGuard } from './jwt.artist.guard';
import { ArtistsModule } from 'src/artists/artists.module';

@Module({
    controllers: [AuthController],
    providers: [AuthService, JWTStrategy],
    exports: [AuthService],    
    imports: [
        UsersModule, 
        JwtModule.register({
        secret: authConstants.secret,
        signOptions: {
            expiresIn: '1d'
        }}),
        PassportModule,
        ArtistsModule
],
})
export class AuthModule {

}
