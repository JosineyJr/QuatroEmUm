import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculadora-idade',
  templateUrl: './calculadora-idade.page.html',
  styleUrls: ['./calculadora-idade.page.scss'],
})
export class CalculadoraIdadePage implements OnInit {
  private birthDay: Date;
  private daysAge: number;
  private hoursAge: number;
  private minutesAge: number;
  private daysNextBirthDay: number;
  private weekDayNextBirthDay: string;

  constructor() {}

  getDataMaxima(): string {
    const date = new Date();
    let max = date.toLocaleString('default', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
    max = max.split('/')[2] + '-' + max.split('/')[1] + '-' + max.split('/')[0];
    return max;
  }

  transformarData(data: Date): Date {
    const dia = parseInt(data.toString().split('-')[2]);
    const mes = parseInt(data.toString().split('-')[1]) - 1;
    const ano = parseInt(data.toString().split('-')[0]);
    return new Date(ano, mes, dia);
  }

  calcularDiasProximoAniversario(
    idadeEmDias: number,
    dataNascimento: Date
  ): void {
    const anoNasc = new Date(dataNascimento).getFullYear();
    const anoAtual = new Date().getFullYear();
    let bissexto = 0;
    for (let i = 0; i < anoAtual - anoNasc; i++) {
      if ((anoNasc + i) % 4 === 0) {
        bissexto += 1;
      }
    }
    if (365 - (idadeEmDias % 365) === 0) {
      this.daysNextBirthDay = 0;
    } else if (anoNasc % 4 === 0) {
      this.daysNextBirthDay = 365 - (idadeEmDias % 365) + bissexto - 1;
    } else if (bissexto > 0) {
      this.daysNextBirthDay = 365 - (idadeEmDias % 365) + bissexto;
    } else {
      this.daysNextBirthDay = 365 - (idadeEmDias % 365);
    }
  }

  calcularIdadeEmDias(dataAtual: Date, dataAniversario: Date): number {
    const idadeEmDias = parseInt(
      String(
        (Number(dataAtual) - Number(new Date(dataAniversario))) /
          (24 * 3600 * 1000)
      )
    );
    this.daysAge = idadeEmDias;
    return idadeEmDias;
  }

  calcularIdadeEmHoras(idadeEmDias: number): number {
    const idadeEmHoras = idadeEmDias * 24;
    this.hoursAge = idadeEmHoras;
    return idadeEmHoras;
  }

  calcularIdadeEmMinutos(idadeEmHoras: number): void {
    this.minutesAge = idadeEmHoras * 60;
  }

  calcularProximaDataAniversario(): void {
    const currentDate = new Date();
    const dataAniversario = this.transformarData(this.birthDay);

    if (
      dataAniversario.getMonth() === currentDate.getMonth() &&
      dataAniversario.getDate() <= currentDate.getDate()
    ) {
      this.weekDayNextBirthDay = this.weekDay(
        new Date(
          currentDate.getFullYear() + 1,
          currentDate.getMonth(),
          dataAniversario.getDate()
        ).getDay()
      );
      console.log('menor =');
      console.log(
        new Date(
          currentDate.getFullYear() + 1,
          currentDate.getMonth(),
          dataAniversario.getDate()
        )
      );
    } else if (
      dataAniversario.getMonth() === currentDate.getMonth() &&
      dataAniversario.getDate() > currentDate.getDate()
    ) {
      this.weekDayNextBirthDay = this.weekDay(
        new Date(
          currentDate.getFullYear(),
          dataAniversario.getMonth(),
          dataAniversario.getDate()
        ).getDay()
      );
      console.log(
        new Date(
          currentDate.getFullYear(),
          dataAniversario.getMonth(),
          dataAniversario.getDate()
        )
      );
    } else if (dataAniversario.getMonth() <= currentDate.getMonth()) {
      this.weekDayNextBirthDay = this.weekDay(
        new Date(
          currentDate.getFullYear() + 1,
          dataAniversario.getMonth(),
          dataAniversario.getDate()
        ).getDay()
      );
      console.log(
        'aqui' +
          new Date(
            currentDate.getFullYear() + 1,
            dataAniversario.getMonth(),
            dataAniversario.getDate()
          )
      );
    } else {
      this.weekDayNextBirthDay = this.weekDay(
        new Date(
          currentDate.getFullYear(),
          dataAniversario.getMonth(),
          dataAniversario.getDate()
        ).getDay()
      );
      console.log(
        new Date(
          currentDate.getFullYear(),
          dataAniversario.getMonth(),
          dataAniversario.getDate()
        )
      );
    }
  }

  calcular(): void {
    if (this.birthDay != null) {
      const dataAtual = new Date();
      const dataAniversario = this.birthDay;
      const idadeEmDias = this.calcularIdadeEmDias(dataAtual, dataAniversario);
      const idadeEmHoras = this.calcularIdadeEmHoras(idadeEmDias);
      const idadeEmMinutos = this.calcularIdadeEmMinutos(idadeEmHoras);

      this.calcularDiasProximoAniversario(idadeEmDias, dataAniversario);
      this.calcularProximaDataAniversario();
    } else {
      alert('Insira uma data!');
    }
  }

  weekDay(day: number): string {
    switch (day) {
      case 0:
        return 'Domingo';
      case 1:
        return 'Segunda-feira';
      case 2:
        return 'Terça-feira';
      case 3:
        return 'Quarta-feira';
      case 4:
        return 'Quinta-feira';
      case 5:
        return 'Sexta-feira';
      case 6:
        return 'Sábado';
    }
  }

  ngOnInit() {}
}
