import { IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsString } from "class-validator";

export class CreateSongDto {
    @IsNotEmpty()
    @IsString()
    readonly title;

    @IsArray()
    @IsString({each: true})
    readonly artists: string[];

    @IsDateString()
    readonly releasedDate: Date;

    @IsMilitaryTime()
    readonly duration: Date;
}