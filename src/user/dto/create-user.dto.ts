import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  vacancy: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  surName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ValidateIf((o) => o.phone)
  phone?: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  @ValidateIf((o) => o.projects)
  projects?: string;

  @IsNotEmpty()
  @IsString()
  @ValidateIf((o) => o.studyPlace)
  studyPlace?: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
