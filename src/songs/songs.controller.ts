import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { Connection } from 'src/common/constants/songs.constant';

@Controller('songs')
export class SongsController {
    constructor(private songsSerivce: SongsService,
        @Inject('CONNECTION') connection: Connection
    ) {
        console.log(connection.DB);
    }
    @Post()
    create(@Body() createSongDto: CreateSongDto): object {
        return this.songsSerivce.create(createSongDto);
    }
    @Get()
    findAll(): object {
        return this.songsSerivce.findAll();
    }

    @Get(':id')
    findOne(@Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE}))id: number): object {
        return this.songsSerivce.findOne(id);
    }

    @Put(':id')
    update(): string {
        return 'This action updates a song';
    }

    @Delete(':id')
    remove(): string {
        return 'This action removes a song';
    }   

}
