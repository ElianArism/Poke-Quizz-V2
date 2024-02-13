import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoginModalComponent } from 'src/app/components/login-modal/login-modal.component';
import { PokeballSvgComponent } from 'src/app/components/pokeball-svg/pokeball-svg.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PokeballSvgComponent,
    LoginModalComponent,
  ],
})
export class HomeModule {}
