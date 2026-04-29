import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from '../songs/entities/song.entity';
import { LiturgyProgramsController } from './liturgy-programs.controller';
import { LiturgyProgramsService } from './liturgy-programs.service';
import { LiturgyProgram } from './entities/liturgy-program.entity';
import { LiturgyProgramSong } from './entities/liturgy-program-song.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LiturgyProgram, LiturgyProgramSong, Song]),
  ],
  controllers: [LiturgyProgramsController],
  providers: [LiturgyProgramsService],
})
export class LiturgyProgramsModule {}
