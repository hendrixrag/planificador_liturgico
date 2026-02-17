import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from './entities/song.entity';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>, // 🎸 Inyectamos el "repositorio" de canciones
  ) {}

  async create(createSongDto: CreateSongDto): Promise<Song> {
    const newSong = this.songRepository.create(createSongDto);
    return this.songRepository.save(newSong);
  }

  findAll(): Promise<Song[]> {
    return this.songRepository.find();
  }

  findOne(id: number): Promise<Song> {
    return this.songRepository.findOneByOrFail({ id });
  }

  async update(id: number, updateSongDto: UpdateSongDto): Promise<Song> {
    await this.songRepository.update(id, updateSongDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.songRepository.delete(id);
  }
}
