import { Playlist } from 'src/playlists/playlist.entity';
import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    ManyToOne
} from 'typeorm';

Entity('songs') 
export class Song{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;
    
    @Column('date')
    releasedDate: Date;

    @Column('date')
    duration: Date;
    
    // @ManyToMany(() => Artist, artist => artist.songs, {cascade: true})
    // @JoinTable({name: 'song_artist'})
    @Column('varchar', {array: true})
    artists: string[];

    @ManyToOne(()=> Playlist, playlist => playlist.songs)
    playlist: Playlist;

    @Column()
    lyrics: string;
}

