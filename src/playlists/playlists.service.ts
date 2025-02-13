import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Song } from 'src/songs/song.entity';
import { CreatePlaylistDto } from './dto/create-playlist.dto';

@Injectable()
export class PlaylistsService {
    constructor(
        @InjectRepository(Playlist)
        private playlistsRepository: Repository<Playlist>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Song)
        private songRepository: Repository<Song>
    ) {}

    async create(playlistDTO: CreatePlaylistDto): Promise<Playlist> {
        const playlist = new Playlist();
        playlist.name = playlistDTO.name;

        const user = await this.userRepository.findOneBy({id: playlistDTO.user});
        playlist.user = user;

        const songs = await this.songRepository.findByIds(playlistDTO.songs);
        playlist.songs = songs;
        
        return await this.playlistsRepository.save(playlist);

    }
}

