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
import { ITrainer } from 'src/app/interfaces/trainer.interface';
import { PokemonApiService } from 'src/app/services/pokemon-api.service';
import { PokemonActions } from 'src/app/store/actions/pokemon.actions';
import { UIActions } from 'src/app/store/actions/ui.actions';
import { AppState } from 'src/app/store/app.store';
import { PokemonState } from 'src/app/store/reducers/pokemon.reducer';
import { TrainerState } from 'src/app/store/reducers/trainer.reducer';
import { pokemonsSelector } from 'src/app/store/selectors/pokemon.selector';
import { trainerSelector } from 'src/app/store/selectors/trainer.selector';
@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.scss'],
})
export class QuizzComponent implements OnInit {
  private readonly store: Store<AppState> = inject(Store);
  private readonly pokemonsState: Observable<PokemonState> =
    this.store.select(pokemonsSelector);
  private readonly trainerState: Observable<TrainerState> =
    this.store.select(trainerSelector);
  private readonly pokemonService: PokemonApiService =
    inject(PokemonApiService);

  @ViewChild('pokemonImg')
  private pokemonImg!: ElementRef<HTMLImageElement>;

  pokemonImgLoaded: boolean = false;
  prominentColor: unknown = '#333';
  pokemonToFind!: Pokemon & { listIdx: number };
  pokemonsInQuizz: Pokemon[] = [];
  pokemonRevealed: boolean = false;
  trainer!: ITrainer;

  ngOnInit(): void {
    this.listenPokemonStateChanges();
    this.retrieveTrainerInformation();
  }

  private retrieveTrainerInformation(): void {
    this.trainerState.subscribe((trainer) => (this.trainer = trainer));
  }

  private listenPokemonStateChanges(): void {
    this.pokemonsState.subscribe(async (state) => {
      this.pokemonImgLoaded = false;
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
      this.pokemonToFind = {
        ...currentPokemonInfo,
        listIdx: state.currentPokemon.listIdx,
      };
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
      // this.gameReady = true;
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
    await this.revealPokemon();
    this.store.dispatch(
      PokemonActions.pokemonFounded({ id: this.pokemonToFind.id })
    );
  }
  private async revealPokemon(): Promise<void> {
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

  nextPokemon(): void {
    this.store.dispatch(PokemonActions.setCurrentPokemon());
    this.pokemonRevealed = false;
    this.prominentColor = '#333';
  }
}
