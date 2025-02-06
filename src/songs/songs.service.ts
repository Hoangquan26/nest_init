import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { title } from 'process';
import { Connection } from '../common/constants/songs.constant';


type Song =  {
    id: number, 
    title: string,
    artists?: string[],
    releasedDate?: string,
    duration?: Date
}

@Injectable()
export class SongsService {
    constructor() {
      
    }
    private readonly songs: Song[] = [ 
        {
            id: 1,
            title: 'Despacito'
        }, 
        {
            id: 2,
            title: 'Shape of You'
        },
        {
            id: 3,
            title: 'See You Again'
        }];

    create(createSongDto: CreateSongDto) {
        const id = this.songs.sort((a, b) => a.id - b.id)[this.songs.length - 1].id + 1;

        const newSong = {
            id,
            ...createSongDto,
            releasedDate: new Date(createSongDto.releasedDate)?.toISOString()
        };
        this.songs.push(newSong);
        return newSong;
    }

    findAll(): Song[] {
        return this.songs;
    }   

    findOne(id: number): Song {
        return this.songs[id];
    }
}

