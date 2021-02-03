import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Calculadora', url: 'calculadora', icon: 'calculator' },
    { title: 'Conversor de Temperatura', url: 'conversor-temperatura', icon: 'thermometer' },
    { title: 'Calculadora de Idade', url: 'calculadora-idade', icon: 'calendar' },
  ];
  constructor() {}
}
