import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LiturgicalCategory } from '../../common/constants/liturgical-categories.constant';
import { Song } from '../../songs/entities/song.entity';
import { LiturgyProgram } from './liturgy-program.entity';

@Entity('liturgy_program_songs')
export class LiturgyProgramSong {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1, description: 'Orden del canto dentro del cancionero' })
  @Column({ type: 'int' })
  orderIndex: number;

  @ApiProperty({
    enum: LiturgicalCategory,
    example: LiturgicalCategory.ENTRY,
    description: 'Momento litúrgico donde se usará el canto',
  })
  @Column({
    type: 'enum',
    enum: LiturgicalCategory,
  })
  category: LiturgicalCategory;

  @ApiProperty({ example: 3 })
  @Column({ type: 'int' })
  songId: number;

  @ApiProperty({ type: () => Song })
  @ManyToOne(() => Song, { eager: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'songId' })
  song: Song;

  @ManyToOne(() => LiturgyProgram, (program) => program.songs, {
    onDelete: 'CASCADE',
  })
  liturgyProgram: LiturgyProgram;
}
