import { Body, Controller, Post } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { Playlist } from './playlist.entity';

@Controller('playlists')
export class PlaylistsController {
    constructor(private playlistsService: PlaylistsService) {}

    @Post()
    create(@Body() playlistDTO: CreatePlaylistDto): Promise<Playlist> {
        return this.playlistsService.create(playlistDTO);
    }
}
