import { ISwapiService } from '../../../application/ports/swapi.interface';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SwapiService implements ISwapiService {
  private logger = new Logger('SwapiService');
  private readonly swapiUrl = process.env.SWAPI_ENDPOINT;

  async obtenerPersonaje(id: string): Promise<any> {
    try {
      const response = await axios.get(`${this.swapiUrl}/people/${id}/`);
      const data = response.data;

      const mapeo: { [key: string]: string } = {
        name: 'nombre',
        height: 'altura',
        mass: 'masa',
        hair_color: 'color_de_cabello',
        skin_color: 'color_de_piel',
        eye_color: 'color_de_ojos',
        birth_year: 'anio_de_nacimiento',
        gender: 'genero',
        homeworld: 'mundo_natal',
        films: 'películas',
        species: 'especies',
        vehicles: 'vehículos',
        starships: 'naves_espaciales',
        created: 'creado',
        edited: 'editado',
      };

      const dataMapeada: any = {};
      for (const key in data) {
        if (mapeo[key]) {
          dataMapeada[mapeo[key]] = data[key];
        } else {
          dataMapeada[key] = data[key];
        }
      }

      return dataMapeada;
    } catch (error) {
      this.logger.error('Error al obtener personaje de SWAPI', error.message);
      throw new NotFoundException('Error al obtener personaje de SWAPI');
    }
  }

  async obtenerPlaneta(planetRoute: string): Promise<any> {
    try {
      const response = await axios.get(planetRoute);
      return response.data;
    } catch (error) {
      this.logger.error('Error al obtener planeta de SWAPI', error.message);
      return null;
    }
  }
}
