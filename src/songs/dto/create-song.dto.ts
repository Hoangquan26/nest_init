import { IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateSongDto {
    @IsNotEmpty()
    @IsString()
    readonly title;

    @IsArray()
    @IsNumber({}, {each: true})
    readonly artists;

    @IsDateString()
    readonly releasedDate: Date;

    @IsMilitaryTime()
    readonly duration: Date;

    @IsString()
    @IsOptional()
    readonly lyrics: string;
}