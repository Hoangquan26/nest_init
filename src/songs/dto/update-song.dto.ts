import { IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateSongDto {
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly title;

    @IsArray()
    @IsNumber({}, { each: true })
    @IsOptional()
    readonly artists;

    @IsDateString()
    @IsOptional()
    readonly releasedDate: Date;

    @IsMilitaryTime()
    @IsOptional()
    readonly duration: Date;

    @IsString()
    @IsOptional()
    readonly lyrics: string;
}