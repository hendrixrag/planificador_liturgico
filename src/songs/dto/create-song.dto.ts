import { IsString, IsInt, MinLength, IsOptional, IsIn } from 'class-validator';
//import { Type } from 'class-transformer';

export class CreateSongDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @MinLength(10)
  lyrics: string;

  @IsString()
  @IsOptional()
  @IsIn(['C', 'G', 'D', 'A', 'E', 'B', 'F', 'Am', 'Em', 'Dm']) // Lista blanca de tonos
  key?: string;

  @IsInt()
  @IsOptional()
  //@Type(() => Number)
  bpm?: number;
}
