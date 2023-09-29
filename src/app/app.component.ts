import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ChangeBackgroundService } from './services/change-background.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('container')
  container!: ElementRef<HTMLElement>;
  private changeBgService: ChangeBackgroundService = inject(
    ChangeBackgroundService
  );
  public subs!: Subscription;
  public bg = 'bg-red';

  ngOnInit(): void {
    this.subs = this.changeBgService.onChangeBackgroundColorEvent(
      this.container
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
