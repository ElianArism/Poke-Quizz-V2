import { ElementRef, Injectable, Renderer2, inject } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChangeBackgroundService {
  private r2: Renderer2 = inject(Renderer2);
  changeBackgroundColorEvent$: Subject<string> = new Subject<string>();

  constructor() {}

  sendChangeBackgroundColorEvent(color: string): void {
    this.changeBackgroundColorEvent$.next(color);
  }

  onChangeBackgroundColorEvent(
    elementRef: ElementRef<HTMLElement>
  ): Subscription {
    const subs = this.changeBackgroundColorEvent$.subscribe(
      (newColor: string) => {
        this.r2.setStyle(elementRef.nativeElement, 'background', newColor);
      }
    );

    return subs;
  }
}
