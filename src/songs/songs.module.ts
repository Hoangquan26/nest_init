import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { connection } from '../common/constants/songs.constant'
import { Song } from './song.entity';
import { Artist } from 'src/artists/artist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  controllers: [SongsController],
  providers: [
    SongsService,
    {
      provide: "CONNECTION",
      useValue: connection
    }
  ],
  imports: [TypeOrmModule.forFeature([Song, Artist])]
})
export class SongsModule {}
