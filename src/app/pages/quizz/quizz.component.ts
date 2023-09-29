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
    this.listenPokemonStateChanges();
  }

  ngAfterViewInit(): void {}

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

      this.pokemonsInQuizz = {
        ...extras,
        pokemonToFind: currentPokemonInfo,
      };
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
    // if (option !== this.pokemonsInQuizz.pokemonToFind.name) {
    if (option !== 'Pikachu') {
      return;
    }

    const pokemonColors = await color.prominent(
      this.pokemonImg.nativeElement.src,
      {
        format: 'hex',
        amount: 4,
      }
    );

    //  console.log(colors);
    //  console.log(
    //    `linear-gradient(to top, ${colors[1]}, ${colors[2]}, ${colors[3]})`
    //  );

    this.r2.setStyle(
      this.pokemonCard.nativeElement,
      'background',
      `linear-gradient(to top, ${pokemonColors[1]}, ${pokemonColors[2]}, ${pokemonColors[3]})`
    );
  }
}
