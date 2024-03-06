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
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
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
  private readonly fb: FormBuilder = inject(FormBuilder);

  private subscriptions: Subscription[] = [];

  @Input('openModal')
  openModal: boolean = false;

  pokemons$: WritableSignal<Pokemon[]> = signal([]);
  pokemonList$: WritableSignal<Pokemon[]> = signal(this.pokemons$());
  trainerForm = this.fb.nonNullable.group({
    pokemonName: new FormControl<string>('', { nonNullable: true }),
    trainerName: new FormControl<string>('', { nonNullable: true }),
    trainerPassword: new FormControl<string>('', { nonNullable: true }),
  });

  constructor() {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.pokemonSelector.subscribe(({ pokemons }) => {
        this.pokemons$.set(pokemons);
      })
    );

    this.subscriptions.push(
      this.trainerForm.controls['pokemonName'].valueChanges.subscribe(
        this.searchPokemon.bind(this)
      )
    );
  }

  hideLoginModal(): void {
    this.openModal = false;
  }

  async saveTrainer(): Promise<void> {
    // this.firebaseService.saveTrainer({});
    // TODO: Save in store or in LS
    // instead of db. when the game finishes then register trainer
  }

  searchPokemon(value: string): void {
    if (!value) {
      this.pokemonList$.set(this.pokemons$());
      return;
    }
    this.pokemonList$.set(
      this.pokemons$().filter((p) => p.name.includes(value))
    );
    if (
      this.pokemonList$()[0].name ===
      this.trainerForm.controls['pokemonName'].value
    ) {
      this.pokemonList$.set([]);
    }
  }

  setSelectedPokemon(pokemonName: string): void {
    this.trainerForm.controls['pokemonName'].setValue(pokemonName);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
