import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  Min,
  ValidateNested,
} from 'class-validator';
import { LiturgicalCategory } from '../../common/constants/liturgical-categories.constant';

export class CreateLiturgyProgramSongDto {
  @ApiProperty({ example: 10 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  songId: number;

  @ApiProperty({
    enum: LiturgicalCategory,
    example: LiturgicalCategory.ENTRY,
  })
  @IsEnum(LiturgicalCategory)
  category: LiturgicalCategory;
}

export class CreateLiturgyProgramDto {
  @ApiProperty({
    example: '2026-03-15',
    description: 'Fecha de la misa en formato YYYY-MM-DD',
  })
  @IsDateString({ strict: true })
  massDate: string;

  @ApiProperty({
    type: () => CreateLiturgyProgramSongDto,
    isArray: true,
    example: [
      { songId: 12, category: LiturgicalCategory.ENTRY },
      { songId: 18, category: LiturgicalCategory.PSALM },
      { songId: 22, category: LiturgicalCategory.HOLY },
      { songId: 26, category: LiturgicalCategory.COMMUNION },
      { songId: 30, category: LiturgicalCategory.RECESSIONAL },
    ],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateLiturgyProgramSongDto)
  songs: CreateLiturgyProgramSongDto[];
}
