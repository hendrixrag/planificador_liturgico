import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('songs') // Nombre de la tabla en Postgres
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  lyrics: string;

  @Column({ length: 10, default: 'C' })
  key: string; // 🎸 Ejemplo: 'G', 'Am', 'F#'

  @Column({ type: 'int', nullable: true })
  bpm: number; // ⏱️ El tiempo del canto

  @Column({ default: true })
  isActive: boolean;
}
