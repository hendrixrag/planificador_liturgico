import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LiturgicalCategory } from '../../common/constants/liturgical-categories.constant';
import { LiturgicalSeason } from '../../common/constants/liturgical-seasons.constant';
import {
  MUSICAL_KEYS,
  type MusicalKey,
} from '../../common/constants/musical-keys.constant';

@Entity('songs') // Nombre de la tabla en Postgres
export class Song {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Santo, Santo, Santo' })
  @Column()
  title: string;

  @ApiProperty({
    example: 'Santo, Santo, Santo es el Señor, Dios del universo...',
  })
  @Column({ type: 'text' })
  lyrics: string;

  @ApiProperty({ enum: MUSICAL_KEYS, example: 'C' })
  @Column({
    type: 'enum',
    enum: [...MUSICAL_KEYS],
    default: 'C',
  })
  key: MusicalKey;

  @ApiProperty({
    enum: LiturgicalCategory,
    isArray: true,
    example: [LiturgicalCategory.HOLY],
  })
  @Column({
    type: 'enum',
    enum: LiturgicalCategory,
    array: true,
    default: [LiturgicalCategory.ENTRY],
  })
  category: LiturgicalCategory[];

  @ApiProperty({
    enum: LiturgicalSeason,
    isArray: true,
    example: [LiturgicalSeason.ORDINARY_TIME],
  })
  @Column({
    type: 'enum',
    enum: LiturgicalSeason,
    array: true,
    default: [LiturgicalSeason.ORDINARY_TIME],
  })
  liturgicalSeason: LiturgicalSeason[];

  @ApiPropertyOptional({ example: 72, nullable: true })
  @Column({ type: 'int', nullable: true })
  bpm: number | null; // ⏱️ El tempo del canto

  @ApiProperty({ example: true })
  @Column({ default: true })
  isActive: boolean;
}
