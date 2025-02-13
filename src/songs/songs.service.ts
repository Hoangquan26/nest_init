import { HttpException, HttpStatus, Inject, Injectable, ParseIntPipe, Query } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { UpdateSongDto } from './dto/update-song.dto';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Artist } from 'src/artists/artist.entity';


@Injectable()
export class SongsService {
    constructor(
        @InjectRepository(Song)
        private songRepository: Repository<Song>,
        @InjectRepository(Artist)
        private artistRepository: Repository<Artist>
    ) {

    }

    async paginate(options: IPaginationOptions) : Promise<Pagination<Song>> {
        const queryBuilder = this.songRepository.createQueryBuilder('song');
        queryBuilder.orderBy('song.releasedDate', 'DESC');
        return paginate<Song>(queryBuilder, options);
    }

    async create(createSongDto: CreateSongDto): Promise<Song> {
        console.log(createSongDto)
        const newSong = new Song();
        newSong.title = createSongDto.title;
        newSong.artists = createSongDto.artists;
        newSong.releasedDate = createSongDto.releasedDate;
        newSong.duration = createSongDto.duration;
        newSong.lyrics = createSongDto.lyrics;

        const artists = await this.artistRepository.findByIds(createSongDto.artists);
        newSong.artists = artists;
        return await this.songRepository.save(newSong);
    }

    findAll(
        page, limit
    ): Promise<Pagination<Song>> {
        console.log(page, limit)
        return this.paginate({
            page,
            limit
        })
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

