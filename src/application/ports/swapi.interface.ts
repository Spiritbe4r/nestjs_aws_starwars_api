export interface ISwapiService {
  obtenerPersonaje(id: string): Promise<any>;
  obtenerPlaneta(planetId: string): Promise<any>;
}
