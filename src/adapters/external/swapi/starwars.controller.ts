import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CrearFavoritoDto } from '../../../application/dto/crear-favorito.dto';
import { FavoriteCharacterResponseDto } from '../../../application/dto/favorite-character-response.dto';
import { FavoriteCharacterService } from '../../../application/services/favorite-character.service';
import { FavoriteCharacter } from '../../../domain/entities/favorite-character.entity';

@ApiTags('StarWars')
@Controller('starwars')
export class StarwarsController {
  constructor(
    private readonly favoriteCharacterService: FavoriteCharacterService,
  ) {}

  @ApiOperation({ summary: 'Crear un personaje favorito' })
  @ApiResponse({
    status: 201,
    description: 'Personaje favorito creado exitosamente.',
    type: FavoriteCharacterResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos proporcionados.',
  })
  @ApiBody({ type: CrearFavoritoDto })
  @Post('favoritos')
  async crearFavorito(
    @Body() crearFavoritoDto: CrearFavoritoDto,
  ): Promise<FavoriteCharacterResponseDto> {
    return this.favoriteCharacterService.crearFavorito(crearFavoritoDto);
  }

  @ApiOperation({ summary: 'Obtener todos los personajes favoritos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de personajes favoritos obtenida exitosamente.',
    type: [FavoriteCharacterResponseDto],
  })
  @Get('favoritos')
  async obtenerFavoritos(): Promise<FavoriteCharacterResponseDto[]> {
    return this.favoriteCharacterService.obtenerFavoritos();
  }

  @ApiOperation({ summary: 'Obtener un personaje favorito por ID' })
  @ApiResponse({
    status: 200,
    description: 'Personaje favorito obtenido exitosamente.',
    type: FavoriteCharacter,
  })
  @ApiResponse({
    status: 404,
    description: 'Personaje favorito no encontrado.',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID único del personaje favorito.',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Get('personaje/:id')
  async obtenerPersonaje(@Param('id') id: string) {
    return this.favoriteCharacterService.obtenerPersonajeSWAPI(id);
  }
}
