import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LiturgyProgramSong } from './liturgy-program-song.entity';

@Entity('liturgy_programs')
export class LiturgyProgram {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '2026-03-15',
    description: 'Fecha de la misa donde se usará este cancionero',
  })
  @Column({ type: 'date' })
  massDate: string;

  @ApiProperty({ type: () => LiturgyProgramSong, isArray: true })
  @OneToMany(() => LiturgyProgramSong, (programSong) => programSong.liturgyProgram, {
    cascade: ['insert'],
    eager: true,
  })
  songs: LiturgyProgramSong[];
}
