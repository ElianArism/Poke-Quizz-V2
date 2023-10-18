import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  Renderer2,
  ViewChild,
  inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from './store/app.store';
import { UISelector } from './store/selectors/ui.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('defaultBg')
  private defaultBg!: ElementRef<HTMLElement>;
  @ViewChild('pokemonDiscoveredBg')
  private pokemonDiscoveredBg!: ElementRef<HTMLElement>;

  private subs!: Subscription;

  private readonly store: Store<AppState> = inject(Store);
  private readonly uiSelector = this.store.select(UISelector);

  constructor(private readonly r2: Renderer2) {}

  ngAfterViewInit(): void {
    this.subs = this.uiSelector.subscribe(({ backgroundColor, bgType }) => {
      console.log(bgType);
      const isDefaultBg = bgType === 'default';
      console.log(isDefaultBg);
      const element = isDefaultBg
        ? this.defaultBg.nativeElement
        : this.pokemonDiscoveredBg.nativeElement;
      console.log(element);

      this.r2.setStyle(element, 'background', backgroundColor);
      this.r2.setStyle(element, 'opacity', '1');

      if (isDefaultBg) {
        this.r2.setStyle(
          this.pokemonDiscoveredBg.nativeElement,
          'opacity',
          '0'
        );
      } else {
        this.r2.setStyle(this.defaultBg.nativeElement, 'opacity', '0');
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
