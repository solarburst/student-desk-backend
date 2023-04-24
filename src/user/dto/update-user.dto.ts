import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @ValidateIf((o) => o.vacancy)
  vacancy: string;

  @IsNotEmpty()
  @IsString()
  @ValidateIf((o) => o.firstName)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ValidateIf((o) => o.surName)
  surName: string;

  @IsNotEmpty()
  @IsString()
  @ValidateIf((o) => o.email)
  email: string;

  @IsNotEmpty()
  @IsString()
  @ValidateIf((o) => o.phone)
  phone?: string;

  @IsNotEmpty()
  @IsString()
  @ValidateIf((o) => o.description)
  description: string;

  @IsNotEmpty()
  @IsString()
  @ValidateIf((o) => o.projects)
  projects?: string;

  @IsNotEmpty()
  @IsString()
  @ValidateIf((o) => o.studyPlace)
  studyPlace?: string;
}
