import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PokeballSvgComponent } from 'src/app/components/pokeball-svg/pokeball-svg.component';
import { RegisterTrainerComponent } from 'src/app/components/register-trainer/register-trainer.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PokeballSvgComponent,
    RegisterTrainerComponent,
  ],
})
export class HomeModule {}
