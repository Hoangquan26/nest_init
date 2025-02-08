import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { connection } from '../common/constants/songs.constant'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './song.entity';
@Module({
  controllers: [SongsController],
  providers: [
    SongsService,
    {
      provide: "CONNECTION",
      useValue: connection
    }
  ],
  imports: [TypeOrmModule.forFeature([Song])]
})
export class SongsModule {}
