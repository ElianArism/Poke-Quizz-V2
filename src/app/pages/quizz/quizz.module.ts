import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizzRoutingModule } from './quizz-routing.module';
import { QuizzComponent } from './quizz.component';


@NgModule({
  declarations: [
    QuizzComponent
  ],
  imports: [
    CommonModule,
    QuizzRoutingModule
  ]
})
export class QuizzModule { }
