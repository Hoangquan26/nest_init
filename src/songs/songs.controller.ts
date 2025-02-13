import { Body, Controller, DefaultValuePipe, Delete, Get, HttpStatus, Inject, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { Connection } from 'src/common/constants/songs.constant';
import { Song } from './song.entity';
import { UpdateResult } from 'typeorm';
import { UpdateSongDto } from './dto/update-song.dto';
import { JWTArtistGuard } from 'src/auth/jwt.artist.guard';

@Controller('songs')
export class SongsController {
    constructor(private songsSerivce: SongsService,
        @Inject('CONNECTION') connection: Connection
    ) {
       
    }

    @UseGuards(JWTArtistGuard)
    @Post()
    create(@Body() createSongDto: CreateSongDto): Promise<Song> {
        return this.songsSerivce.create(createSongDto);
    }
    @Get()
    findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10
    ): object {
        return this.songsSerivce.findAll(page, limit);
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
