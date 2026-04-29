import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
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
import { CreateLiturgyProgramDto } from './dto/create-liturgy-program.dto';
import { LiturgyProgramsService } from './liturgy-programs.service';
import { LiturgyProgram } from './entities/liturgy-program.entity';

@ApiTags('Liturgy Programs')
@Controller('liturgy-programs')
export class LiturgyProgramsController {
  constructor(
    private readonly liturgyProgramsService: LiturgyProgramsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un cancionero para una misa' })
  @ApiBody({
    type: CreateLiturgyProgramDto,
    examples: {
      cancioneroDomingo: {
        summary: 'Cancionero para misa dominical',
        value: {
          massDate: '2026-03-15',
          songs: [
            { songId: 12, category: 'Entrada' },
            { songId: 18, category: 'Salmo responsorial' },
            { songId: 22, category: 'Santo' },
            { songId: 26, category: 'Comunión' },
            { songId: 30, category: 'Salida' },
          ],
        },
      },
    },
  })
  @ApiCreatedResponse({
    type: LiturgyProgram,
    description: 'Cancionero creado con el orden litúrgico aplicado',
    schema: {
      example: {
        id: 3,
        massDate: '2026-03-15',
        songs: [
          {
            id: 41,
            orderIndex: 1,
            category: 'Entrada',
            songId: 12,
            song: {
              id: 12,
              title: 'Ven Espíritu Santo',
              lyrics: 'Ven, Espíritu Santo...',
              key: 'G',
              category: ['Entrada'],
              liturgicalSeason: ['Tiempo ordinario'],
              bpm: 74,
              isActive: true,
            },
          },
        ],
      },
    },
  })
  create(@Body() createLiturgyProgramDto: CreateLiturgyProgramDto) {
    return this.liturgyProgramsService.create(createLiturgyProgramDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar cancioneros planificados' })
  @ApiOkResponse({
    type: LiturgyProgram,
    isArray: true,
    schema: {
      example: [
        {
          id: 3,
          massDate: '2026-03-15',
          songs: [
            {
              id: 41,
              orderIndex: 1,
              category: 'Entrada',
              songId: 12,
              song: {
                id: 12,
                title: 'Ven Espíritu Santo',
                lyrics: 'Ven, Espíritu Santo...',
                key: 'G',
                category: ['Entrada'],
                liturgicalSeason: ['Tiempo ordinario'],
                bpm: 74,
                isActive: true,
              },
            },
          ],
        },
      ],
    },
  })
  findAll() {
    return this.liturgyProgramsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un cancionero por ID' })
  @ApiParam({ name: 'id', type: Number, example: 3 })
  @ApiOkResponse({
    type: LiturgyProgram,
    schema: {
      example: {
        id: 3,
        massDate: '2026-03-15',
        songs: [
          {
            id: 41,
            orderIndex: 1,
            category: 'Entrada',
            songId: 12,
            song: {
              id: 12,
              title: 'Ven Espíritu Santo',
              lyrics: 'Ven, Espíritu Santo...',
              key: 'G',
              category: ['Entrada'],
              liturgicalSeason: ['Tiempo ordinario'],
              bpm: 74,
              isActive: true,
            },
          },
        ],
      },
    },
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.liturgyProgramsService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un cancionero por ID' })
  @ApiParam({ name: 'id', type: Number, example: 3 })
  @ApiNoContentResponse({
    description: 'Cancionero eliminado correctamente',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.liturgyProgramsService.remove(id);
  }
}
