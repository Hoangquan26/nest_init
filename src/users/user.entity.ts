import { Playlist } from 'src/playlists/playlist.entity';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';

Entity('users') 
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;  

    @Column()
    lastName: string;

    @Column()
    email: string;  

    @Column()
    password: string;

    @OneToMany(() => Playlist, (playlist) => playlist.user)
    playlists: Playlist[];
}