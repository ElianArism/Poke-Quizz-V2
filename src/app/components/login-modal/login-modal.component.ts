import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Pokemon } from 'src/app/interfaces/pokemon.interface';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AppState } from 'src/app/store/app.store';
import { pokemonsSelector } from 'src/app/store/selectors/pokemon.selector';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit, OnDestroy {
  private readonly store: Store<AppState> = inject(Store);
  private readonly pokemonSelector = this.store.select(pokemonsSelector);
  private readonly firebaseService: FirebaseService = inject(FirebaseService);

  private subscriptions: Subscription[] = [];

  @Input('openModal')
  openModal: boolean = false;

  pokemons$: WritableSignal<Pokemon[]> = signal([]);
  pokemonList$: WritableSignal<Pokemon[]> = signal(this.pokemons$());
  selectedPokemonControl: FormControl = new FormControl<string>('', {
    nonNullable: true,
  });

  ngOnInit(): void {
    this.subscriptions.push(
      this.pokemonSelector.subscribe(({ pokemons }) => {
        this.pokemons$.set(pokemons);
      })
    );

    this.subscriptions.push(
      this.selectedPokemonControl.valueChanges.subscribe(
        this.searchPokemon.bind(this)
      )
    );
  }

  hideLoginModal(): void {
    this.openModal = false;
  }

  async saveTrainer(): Promise<void> {
    // this.firebaseService.saveTrainer({});
  }

  searchPokemon(value: string): void {
    if (!value) {
      this.pokemonList$.set(this.pokemons$());
      return;
    }
    this.pokemonList$.set(
      this.pokemons$().filter((p) => p.name.includes(value))
    );
    if (this.pokemonList$()[0].name === this.selectedPokemonControl.value) {
      this.pokemonList$.set([]);
    }
  }

  setSelectedPokemon(pokemonName: string): void {
    this.selectedPokemonControl.setValue(pokemonName);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
