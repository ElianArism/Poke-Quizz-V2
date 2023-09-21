import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
  inject,
} from '@angular/core';
import * as color from 'color.js';
@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.scss'],
})
export class QuizzComponent implements AfterViewInit {
  @ViewChild('pokemonImg')
  private pokemonImg!: ElementRef<HTMLImageElement>;
  @ViewChild('pokemonCard')
  private pokemonCard!: ElementRef<HTMLElement>;

  private r2: Renderer2 = inject(Renderer2);

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
