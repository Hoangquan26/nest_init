import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerModule } from './common/middleware/logger/logger.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { Song } from './songs/song.entity';
import { PlaylistsModule } from './playlists/playlists.module';
import { UsersModule } from './users/users.module';
import { DataSource } from 'typeorm';
import { Artist } from './artists/artist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './playlists/playlist.entity';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { ArtistsModule } from './artists/artists.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1',
      database: 'spotify-clone',
      entities: [Song, Artist, Playlist, User],
      synchronize: true,
    }),
    SongsModule, 
    LoggerModule,
    PlaylistsModule,
    UsersModule,
    AuthModule,
    ArtistsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})



export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(SongsController);
  }

  constructor(private dataSource: DataSource) {
    console.log(dataSource.driver.database);
  }
}
