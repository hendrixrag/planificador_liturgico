import { IsString, IsInt, MinLength, IsOptional, IsIn } from 'class-validator';
import { MUSICAL_KEYS } from '../../common/constants/musical-keys.constant';

export class CreateSongDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @MinLength(10)
  lyrics: string;

  @IsString()
  @IsOptional()
  @IsIn(MUSICAL_KEYS) // Lista blanca de tonos
  key?: string;

  @IsInt()
  @IsOptional()
  bpm?: number;
}
