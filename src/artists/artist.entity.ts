
import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    ManyToMany
} from 'typeorm'


@Entity('artists')
export class Artist {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User, (user)=>user.id)
    @JoinColumn()
    user: User;

    @ManyToMany(() => Song, (song) => song.artists)
    songs: Song[]
}