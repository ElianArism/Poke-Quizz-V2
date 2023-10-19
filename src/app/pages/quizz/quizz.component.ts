import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as color from 'color.js';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/interfaces/pokemon.interface';
import { PokemonApiService } from 'src/app/services/pokemon-api.service';
import { PokemonActions } from 'src/app/store/actions/pokemon.actions';
import { UIActions } from 'src/app/store/actions/ui.actions';
import { AppState } from 'src/app/store/app.store';
import { PokemonState } from 'src/app/store/reducers/pokemon.reducer';
import { pokemonsSelector } from 'src/app/store/selectors/pokemon.selector';
@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.scss'],
})
export class QuizzComponent implements OnInit {
  private readonly store: Store<AppState> = inject(Store);
  private readonly pokemonsState: Observable<PokemonState> =
    this.store.select(pokemonsSelector);

  private readonly pokemonService: PokemonApiService =
    inject(PokemonApiService);

  @ViewChild('pokemonImg')
  private pokemonImg!: ElementRef<HTMLImageElement>;
  @ViewChild('pokemonCard')
  private pokemonCard!: ElementRef<HTMLElement>;

  prominentColor: any = 'white';
  pokemonToFind!: Pokemon;
  pokemonsInQuizz: Pokemon[] = [];
  pokemonRevealed: boolean = false;

  ngOnInit(): void {
    this.store.dispatch(PokemonActions.startLoadingPokemons());
    this.listenPokemonStateChanges();
  }

  private listenPokemonStateChanges(): void {
    this.pokemonsState.subscribe(async (state) => {
      if (!state.currentPokemon) return;

      const currentPokemonInfo = await this.pokemonService.getPokemonInfo(
        state.currentPokemon.name
      );

      const extras = this.selectExtrasForQuizz({
        pokemonToFindIdx: state.currentPokemon.listIdx,
        pokemonToFindId: currentPokemonInfo.id,
        amountLeftToDiscover: state.amountLeftToDiscover,
        pokemons: state.pokemons,
      });
      this.pokemonToFind = currentPokemonInfo;
      const idx = Math.round(Math.random() * 2);

      this.pokemonsInQuizz[idx] = state.currentPokemon;
      if (idx === 1) {
        this.pokemonsInQuizz[idx + 1] = extras.firstExtra;
        this.pokemonsInQuizz[idx - 1] = extras.secondExtra;
      } else if (idx === 2) {
        this.pokemonsInQuizz[idx - 1] = extras.firstExtra;
        this.pokemonsInQuizz[idx - 2] = extras.secondExtra;
      } else {
        this.pokemonsInQuizz[idx + 1] = extras.firstExtra;
        this.pokemonsInQuizz[idx + 2] = extras.secondExtra;
      }
    });
  }

  private selectExtrasForQuizz({
    pokemonToFindIdx,
    pokemonToFindId,
    amountLeftToDiscover,
    pokemons,
  }: {
    amountLeftToDiscover: number;
    pokemons: Pokemon[];
    pokemonToFindIdx: number;
    pokemonToFindId: number;
  }) {
    if (amountLeftToDiscover <= 3) {
      const [firstExtra, secondExtra] = pokemons.filter(
        (p) => p.id !== pokemonToFindId
      );
      return { firstExtra, secondExtra };
    } else if (pokemonToFindIdx < 1) {
      return {
        firstExtra: pokemons[pokemonToFindIdx + 1],
        secondExtra: pokemons[pokemonToFindIdx + 2],
      };
    } else if (pokemonToFindIdx + 1 >= amountLeftToDiscover) {
      return {
        firstExtra: pokemons[pokemonToFindIdx - 1],
        secondExtra: pokemons[pokemonToFindIdx - 2],
      };
    }
    return {
      firstExtra: pokemons[pokemonToFindIdx - 1],
      secondExtra: pokemons[pokemonToFindIdx + 1],
    };
  }

  async chooseOption(option: string): Promise<void> {
    if (option !== this.pokemonToFind.name) return;

    const pokemonColors = await color.prominent(
      this.pokemonImg.nativeElement.src,
      {
        format: 'hex',
        amount: 4,
      }
    );

    this.prominentColor = pokemonColors[3];

    this.pokemonRevealed = true;

    this.store.dispatch(
      UIActions.changeAppBackgroundColor({
        // color: `linear-gradient(to top, ${pokemonColors[1]}, ${pokemonColors[2]}, ${pokemonColors[3]})`,
        color: `linear-gradient(to top, ${pokemonColors[1]},  ${pokemonColors[3]})`,
        bgType: 'custom',
      })
    );
  }
}
