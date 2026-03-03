import {
  IsString,
  IsInt,
  MinLength,
  IsOptional,
  IsEnum,
  IsIn,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  MUSICAL_KEYS,
  type MusicalKey,
} from '../../common/constants/musical-keys.constant';
import { LiturgicalCategory } from '../../common/constants/liturgical-categories.constant';
import { LiturgicalSeason } from '../../common/constants/liturgical-seasons.constant';

export class CreateSongDto {
  @ApiProperty({
    example: 'Ven Espíritu Santo',
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty({
    example: 'Ven, Espíritu Santo, llena los corazones de tus fieles...',
    minLength: 10,
  })
  @IsString()
  @MinLength(10)
  lyrics: string;

  @ApiPropertyOptional({
    enum: MUSICAL_KEYS,
    example: 'G',
  })
  @IsString()
  @IsOptional()
  @IsIn(MUSICAL_KEYS)
  key?: MusicalKey;

  @ApiPropertyOptional({
    example: 74,
    minimum: 1,
  })
  @IsInt()
  @IsOptional()
  bpm?: number;

  @ApiProperty({
    enum: LiturgicalCategory,
    isArray: true,
    example: [LiturgicalCategory.ENTRY],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(LiturgicalCategory, { each: true })
  category: LiturgicalCategory[];

  @ApiProperty({
    enum: LiturgicalSeason,
    isArray: true,
    example: [LiturgicalSeason.ORDINARY_TIME],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(LiturgicalSeason, { each: true })
  liturgicalSeason: LiturgicalSeason[];
}
