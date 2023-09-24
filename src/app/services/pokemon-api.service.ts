import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonApiService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly url: string = 'https://pokeapi.co/api/v2/pokemon';

  getAllPokemons(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${this.url}?limit=100000&offset=0`);
  }
}
