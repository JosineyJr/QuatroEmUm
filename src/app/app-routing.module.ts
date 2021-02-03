import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'calculadora',
    loadChildren: () => import('./pages/calculadora/calculadora.module').then( m => m.CalculadoraPageModule)
  },
  {
    path: 'conversor-temperatura',
    loadChildren: () => import('./pages/conversor-temperatura/conversor-temperatura.module').then( m => m.ConversorTemperaturaPageModule)
  },
  {
    path: 'calculadora-idade',
    loadChildren: () => import('./pages/calculadora-idade/calculadora-idade.module').then( m => m.CalculadoraIdadePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
