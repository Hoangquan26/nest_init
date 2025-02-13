import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePlaylistDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsArray()
    @IsNotEmpty()
    @IsNumber({}, { each: true })
    readonly songs: number[];

    @IsNotEmpty()
    @IsNumber()
    readonly user: number;
}