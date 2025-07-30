import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    
    @IsString()
    @MinLength(3)
    nombre: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(4)
    password: string;
}
