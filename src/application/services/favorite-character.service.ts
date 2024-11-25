import { CrearFavoritoDto } from './../dto/crear-favorito.dto';
import { Injectable, Inject } from '@nestjs/common';
import { IFavoriteCharacterRepository } from '../ports/repository.interface';
import { ISwapiService } from '../ports/swapi.interface';
import { FavoriteCharacterResponseDto } from '../dto/favorite-character-response.dto';
import { FavoriteCharacterMapper } from '../mappers/favorite-character.mapper';

@Injectable()
export class FavoriteCharacterService {
  constructor(
    @Inject('FavoriteCharacterRepository')
    private readonly repository: IFavoriteCharacterRepository,
    @Inject('SwapiInterface') private readonly swapiService: ISwapiService,
  ) {}

  public async crearFavorito(
    crearFavoritoDto: CrearFavoritoDto,
  ): Promise<FavoriteCharacterResponseDto> {
    const nuevoFavorito =
      FavoriteCharacterMapper.toDomainEntity(crearFavoritoDto);

    const faviritoCreado = await this.repository.crear(nuevoFavorito);
    return FavoriteCharacterMapper.toResponseDto(faviritoCreado);
  }

  async obtenerFavoritos(): Promise<FavoriteCharacterResponseDto[]> {
    return (await this.repository.obtenerTodos()).map((item) =>
      FavoriteCharacterMapper.toResponseDto(item),
    );
  }

  async obtenerPersonajeSWAPI(id: string): Promise<any> {
    const personaje = await this.swapiService.obtenerPersonaje(id);

    const planeta = await this.swapiService.obtenerPlaneta(
      personaje?.mundo_natal,
    );

    return {
      ...personaje,
      planeta,
    };
  }
}
