import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { LITURGICAL_CATEGORIES } from '../common/constants/liturgical-categories.constant';
import { Song } from '../songs/entities/song.entity';
import {
  CreateLiturgyProgramDto,
  CreateLiturgyProgramSongDto,
} from './dto/create-liturgy-program.dto';
import { LiturgyProgram } from './entities/liturgy-program.entity';
import { LiturgyProgramSong } from './entities/liturgy-program-song.entity';

@Injectable()
export class LiturgyProgramsService {
  constructor(
    @InjectRepository(LiturgyProgram)
    private readonly liturgyProgramRepository: Repository<LiturgyProgram>,
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
  ) {}

  async create(createDto: CreateLiturgyProgramDto): Promise<LiturgyProgram> {
    this.validateLiturgicalOrder(createDto.songs);

    const songs = await this.getSongsMap(createDto.songs);

    const program = this.liturgyProgramRepository.create({
      massDate: createDto.massDate,
      songs: createDto.songs.map((programSong, index) => {
        return {
          orderIndex: index + 1,
          category: programSong.category,
          songId: programSong.songId,
          song: songs.get(programSong.songId),
        } as LiturgyProgramSong;
      }),
    });

    const savedProgram = await this.liturgyProgramRepository.save(program);
    return this.findOne(savedProgram.id);
  }

  async findAll(): Promise<LiturgyProgram[]> {
    const programs = await this.liturgyProgramRepository.find({
      order: {
        massDate: 'ASC',
        id: 'DESC',
      },
    });

    return programs.map((program) => this.sortProgramSongs(program));
  }

  async findOne(id: number): Promise<LiturgyProgram> {
    const program = await this.liturgyProgramRepository.findOneByOrFail({ id });
    return this.sortProgramSongs(program);
  }

  async remove(id: number): Promise<void> {
    await this.liturgyProgramRepository.delete(id);
  }

  private async getSongsMap(
    songsInput: CreateLiturgyProgramSongDto[],
  ): Promise<Map<number, Song>> {
    const songIds = songsInput.map((song) => song.songId);
    const uniqueSongIds = [...new Set(songIds)];

    const songs = await this.songRepository.find({
      where: {
        id: In(uniqueSongIds),
      },
    });

    if (songs.length !== uniqueSongIds.length) {
      const foundIds = new Set(songs.map((song) => song.id));
      const missingIds = uniqueSongIds.filter((id) => !foundIds.has(id));

      throw new BadRequestException({
        message: 'Hay canciones inexistentes en el cancionero.',
        missingSongIds: missingIds,
      });
    }

    return new Map(songs.map((song) => [song.id, song]));
  }

  private validateLiturgicalOrder(songs: CreateLiturgyProgramSongDto[]): void {
    const categoryOrder = new Map(
      LITURGICAL_CATEGORIES.map((category, index) => [category, index]),
    );

    for (let index = 1; index < songs.length; index += 1) {
      const previousCategory = songs[index - 1].category;
      const currentCategory = songs[index].category;

      const previousIndex = categoryOrder.get(previousCategory);
      const currentIndex = categoryOrder.get(currentCategory);

      if (
        previousIndex !== undefined &&
        currentIndex !== undefined &&
        currentIndex < previousIndex
      ) {
        throw new BadRequestException({
          message:
            'El orden de los cantos no respeta la secuencia litúrgica de la misa.',
          previousCategory,
          currentCategory,
        });
      }
    }
  }

  private sortProgramSongs(program: LiturgyProgram): LiturgyProgram {
    program.songs = [...program.songs].sort((songA, songB) => {
      return songA.orderIndex - songB.orderIndex;
    });

    return program;
  }
}
