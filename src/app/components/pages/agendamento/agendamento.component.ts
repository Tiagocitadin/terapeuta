import { Component } from '@angular/core';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})
export class AgendamentoComponent {
  cliente = {
    nome: 'Tiago Goulart Citadin',
    email: 'tyagogc@gmail.com',
    telefone: '48999548935',
    data: '25/06/2025',
    horario: '10:00'
  };

  horarios: string[] = [
    '08:00', '09:00', '10:00', '11:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  enviarFormulario() {
    const mensagem = `Olá! Gostaria de agendar uma sessão com os seguintes dados:\n` +
      `*Nome:* ${this.cliente.nome}\n` +
      `*E-mail:* ${this.cliente.email}\n` +
      `*Telefone:* ${this.cliente.telefone}\n` +
      `*Data:* ${this.formatarData(this.cliente.data)}\n` +
      `*Horário:* ${this.cliente.horario}`;
  
    const numeroWhatsApp = '5548999222343'; // com DDI + DDD
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
  
    window.open(url, '_blank');
  }
  

  formatarData(data: string): string {
    if (!data) return '';
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  }
}
