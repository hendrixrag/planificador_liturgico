import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { LiturgicalCategory } from '../../common/constants/liturgical-categories.constant';
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
    default: LiturgicalCategory.ENTRY,
  })
  category: LiturgicalCategory;

  @Column({ type: 'int', nullable: true })
  bpm: number; // ⏱️ El tempo del canto

  @Column({ default: true })
  isActive: boolean;
}
