import {
  IsString,
  IsInt,
  MinLength,
  IsOptional,
  IsEnum,
  IsIn,
} from 'class-validator';
import {
  MUSICAL_KEYS,
  type MusicalKey,
} from '../../common/constants/musical-keys.constant';
import { LiturgicalCategory } from '../../common/constants/liturgical-categories.constant';

export class CreateSongDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @MinLength(10)
  lyrics: string;

  @IsString()
  @IsOptional()
  @IsIn(MUSICAL_KEYS)
  key?: MusicalKey;

  @IsInt()
  @IsOptional()
  bpm?: number;

  @IsEnum(LiturgicalCategory)
  category: LiturgicalCategory;
}
