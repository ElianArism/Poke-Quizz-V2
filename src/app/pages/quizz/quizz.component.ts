import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
  inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as color from 'color.js';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/interfaces/pokemon.interface';
import { PokemonApiService } from 'src/app/services/pokemon-api.service';
import { PokemonActions } from 'src/app/store/actions/pokemon.actions';
import { AppState } from 'src/app/store/app.store';
import { PokemonState } from 'src/app/store/reducers/pokemon.reducer';
import { pokemonsSelector } from 'src/app/store/selectors/pokemon.selector';
@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.scss'],
})
export class QuizzComponent implements OnInit, AfterViewInit {
  private readonly store: Store<AppState> = inject(Store);
  private readonly pokemonService: PokemonApiService =
    inject(PokemonApiService);
  private readonly pokemonsState: Observable<PokemonState> =
    this.store.select(pokemonsSelector);

  @ViewChild('pokemonImg')
  private pokemonImg!: ElementRef<HTMLImageElement>;
  @ViewChild('pokemonCard')
  private pokemonCard!: ElementRef<HTMLElement>;

  private r2: Renderer2 = inject(Renderer2);

  pokemonsInQuizz!: {
    pokemonToFind: Pokemon;
    firstExtra: Pokemon;
    secondExtra: Pokemon;
  };

  ngOnInit(): void {
    this.store.dispatch(PokemonActions.startLoadingPokemons());

    this.pokemonsState.subscribe((state) => {
      if (state.currentPokemon) {
        if (state.amountLeftToDiscover <= 3) {
          const [firstExtra, secondExtra] = state.pokemons.filter(
            (p) => p.id !== state.currentPokemon?.id
          );
          this.pokemonsInQuizz = {
            pokemonToFind: state.currentPokemon,
            firstExtra,
            secondExtra,
          };
        } else if (state.currentPokemon.listIdx < 1) {
          this.pokemonsInQuizz = {
            pokemonToFind: state.currentPokemon,
            firstExtra: state.pokemons[state.currentPokemon.listIdx + 1],
            secondExtra: state.pokemons[state.currentPokemon.listIdx + 2],
          };
        } else if (
          state.currentPokemon.listIdx + 1 >=
          state.amountLeftToDiscover
        ) {
          this.pokemonsInQuizz = {
            pokemonToFind: state.currentPokemon,
            firstExtra: state.pokemons[state.currentPokemon.listIdx - 1],
            secondExtra: state.pokemons[state.currentPokemon.listIdx - 2],
          };
        }
        this.pokemonsInQuizz = {
          pokemonToFind: state.currentPokemon,
          firstExtra: state.pokemons[state.currentPokemon.listIdx - 1],
          secondExtra: state.pokemons[state.currentPokemon.listIdx - 2],
        };
      }

      console.log(this.pokemonsInQuizz);
    });
  }

  ngAfterViewInit(): void {
    color
      .prominent(this.pokemonImg.nativeElement.src, {
        format: 'hex',
        amount: 4,
      })
      .then((colors) => {
        console.log(colors);
        console.log(
          `linear-gradient(to top, ${colors[1]}, ${colors[2]}, ${colors[3]})`
        );
        // this.r2.setStyle(
        //   this.pokemonCard.nativeElement,
        //   'background',
        //   `linear-gradient(to top, ${colors[1]}, ${colors[2]}, ${colors[3]})`
        // );
      })
      .catch(console.log);
  }
}
