import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'quizz',
    loadChildren: () =>
      import('./pages/quizz/quizz.module').then((m) => m.QuizzModule),
  },
  {
    path: 'ranking',
    loadChildren: () =>
      import('./pages/ranking/ranking.module').then((m) => m.RankingModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: '*',
    pathMatch: 'full',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
