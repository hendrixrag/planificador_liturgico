import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Song } from './entities/song.entity';

@ApiTags('Songs')
@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una canción' })
  @ApiBody({ type: CreateSongDto })
  @ApiCreatedResponse({ type: Song })
  create(@Body() createSongDto: CreateSongDto): Promise<Song> {
    return this.songsService.create(createSongDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar canciones' })
  @ApiOkResponse({ type: Song, isArray: true })
  findAll(): Promise<Song[]> {
    return this.songsService.findAll();
  }

  @Get('meta/keys')
  @ApiOperation({ summary: 'Listar tonalidades musicales disponibles' })
  @ApiOkResponse({
    schema: {
      type: 'array',
      items: { type: 'string' },
    },
  })
  getMusicalKeys() {
    return this.songsService.getMusicalKeys();
  }

  @Get('meta/categories')
  @ApiOperation({ summary: 'Listar categorías litúrgicas disponibles' })
  @ApiOkResponse({
    schema: {
      type: 'array',
      items: { type: 'string' },
    },
  })
  getLiturgicalCategories() {
    return this.songsService.getLiturgicalCategories();
  }

  @Get('meta/seasons')
  @ApiOperation({ summary: 'Listar tiempos litúrgicos disponibles' })
  @ApiOkResponse({
    schema: {
      type: 'array',
      items: { type: 'string' },
    },
  })
  getLiturgicalSeasons() {
    return this.songsService.getLiturgicalSeasons();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una canción por ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiOkResponse({ type: Song })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Song> {
    return this.songsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una canción por ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiBody({ type: UpdateSongDto })
  @ApiOkResponse({ type: Song })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSongDto: UpdateSongDto,
  ): Promise<Song> {
    return this.songsService.update(id, updateSongDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una canción por ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiNoContentResponse({ description: 'Canción eliminada correctamente' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.songsService.remove(id);
  }
}
