import {IsBoolean, IsDate, IsEmail, IsString} from 'class-validator';

class CreateUserDto {
    @IsString()
    public Name?: string;

    @IsString()
    public UserName?: string;

    @IsEmail()
    public Email?: string;

    @IsString()
    public PassWord?: string;

    @IsDate()
    public Date? : Date

    @IsBoolean()
    public sex? : Boolean
}

export default CreateUserDto;