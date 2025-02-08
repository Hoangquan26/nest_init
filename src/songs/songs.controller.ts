import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { Connection } from 'src/common/constants/songs.constant';
import { Song } from './song.entity';
import { UpdateResult } from 'typeorm';
import { UpdateSongDto } from './dto/update-song.dto';

@Controller('songs')
export class SongsController {
    constructor(private songsSerivce: SongsService,
        @Inject('CONNECTION') connection: Connection
    ) {
       
    }
    @Post()
    create(@Body() createSongDto: CreateSongDto): Promise<Song> {
        return this.songsSerivce.create(createSongDto);
    }
    @Get()
    findAll(): object {
        return this.songsSerivce.findAll();
    }

    @Get(':id')
    findOne(@Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE}))id: number): Promise<Song> {
        return this.songsSerivce.findOne(id);
    }

    @Put(':id')
    update(
        @Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE}))id: number,
        @Body() updateSongDto: UpdateSongDto
    ): Promise<UpdateResult> {
        return this.songsSerivce.update(id, updateSongDto);
    }

    @Delete(':id')
    remove(): string {
        return 'This action removes a song';
    }   

}
