import { IsNotEmpty, IsString, IsArray, ArrayNotEmpty } from 'class-validator';

export class ConvertFileDto {
  @IsNotEmpty()
  @IsString()
  readonly fileName: string;

  @IsNotEmpty()
  @IsString()
  readonly fileType: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  readonly filePaths: string[];
}
