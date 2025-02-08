import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { title } from 'process';
import { Connection } from '../common/constants/songs.constant';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { UpdateSongDto } from './dto/update-song.dto';




@Injectable()
export class SongsService {
    constructor(
        @InjectRepository(Song)
        private songRepository: Repository<Song>
    ) {

    }

    create(createSongDto: CreateSongDto): Promise<Song> {
        console.log(createSongDto)
        const newSong = new Song();
        newSong.title = createSongDto.title;
        newSong.artists = createSongDto.artists;
        newSong.releasedDate = createSongDto.releasedDate;
        newSong.duration = createSongDto.duration;
        newSong.lyrics = createSongDto.lyrics;
        return this.songRepository.save(newSong);
    }

    findAll(): Promise<Song[]> {
        return this.songRepository.find();
    }   

    findOne(id: number): Promise<Song> {
        console.log(id)
        return this.songRepository.findOneBy({id});
    }

    remove(id: number): Promise<void> {
        return this.songRepository.delete(id)
        .then((result) => {
            if (result.affected === 0) {
                throw new HttpException('Song not found', HttpStatus.NOT_FOUND);
            }
        });
    }

    update(id: number, updateSongDto: UpdateSongDto): Promise<UpdateResult> {
        return this.songRepository.update({id}, updateSongDto)
    }
}

