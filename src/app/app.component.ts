import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private router: Router = inject(Router);
  public bg = 'bg-red';

  ngOnInit(): void {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((navigationObj) => {
        this.bg =
          (navigationObj as NavigationEnd).url === '/home'
            ? 'bg-red'
            : 'bg-white';
      });
  }
}
