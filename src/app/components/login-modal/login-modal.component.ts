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
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Pokemon } from 'src/app/interfaces/pokemon.interface';
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

  private subscription!: Subscription;

  @Input('openModal')
  openModal: boolean = false;

  pokemons$: WritableSignal<Pokemon[]> = signal([]);

  ngOnInit(): void {
    this.subscription = this.pokemonSelector.subscribe(({ pokemons }) => {
      this.pokemons$.set(pokemons);
      console.log(this.pokemons$());
    });
  }

  hideLoginModal(): void {
    this.openModal = false;
  }

  async saveTrainer(): Promise<void> {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
