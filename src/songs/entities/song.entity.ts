import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { LiturgicalCategory } from '../../common/constants/liturgical-categories.constant';
import { LiturgicalSeason } from '../../common/constants/liturgical-seasons.constant';
import {
  MUSICAL_KEYS,
  type MusicalKey,
} from '../../common/constants/musical-keys.constant';

@Entity('songs') // Nombre de la tabla en Postgres
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  lyrics: string;

  @Column({
    type: 'enum',
    enum: [...MUSICAL_KEYS],
    default: 'C',
  })
  key: MusicalKey;

  @Column({
    type: 'enum',
    enum: LiturgicalCategory,
    array: true,
    default: [LiturgicalCategory.ENTRY],
  })
  category: LiturgicalCategory[];

  @Column({
    type: 'enum',
    enum: LiturgicalSeason,
    array: true,
    default: [LiturgicalSeason.ORDINARY_TIME],
  })
  liturgicalSeason: LiturgicalSeason[];

  @Column({ type: 'int', nullable: true })
  bpm: number | null; // ⏱️ El tempo del canto

  @Column({ default: true })
  isActive: boolean;
}
