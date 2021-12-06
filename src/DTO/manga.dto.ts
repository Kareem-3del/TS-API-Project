import {IsArray, IsBoolean, IsNumber, IsString} from 'class-validator';

class AddMangaDto {
    @IsString()
    public title?: String;

    @IsString()
    public story?: String;

    @IsString()
    public type?: String;

    @IsString()
    public author?: String;

    @IsString()
    public artist?: String;

    @IsBoolean()
    public published?: Boolean;

    @IsNumber()
    public age?: Number;

    @IsArray()
    public generis?: Array<String>;

}

export default AddMangaDto;