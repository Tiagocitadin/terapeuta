import { Component } from '@angular/core';
import { AgendamentoService } from 'src/app/service/agendamento.service';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})
export class AgendamentoComponent {
  cliente = {
    nome: '',
    email: '',
    telefone: '',
    data: '',
    horario: ''
  };

  feriados = [
    '2025-01-01',  // Ano Novo
    '2025-02-25',  // Carnaval
    '2025-04-21',  // Tiradentes
    '2025-05-01',  // Dia do Trabalhador
    '2025-09-07',  // Independência do Brasil
    '2025-10-12',  // Nossa Senhora Aparecida
    '2025-11-02',  // Finados
    '2025-11-15',  // Proclamação da República
    '2025-12-25'   // Natal
  ];

  horarios: string[] = [];

  constructor(
    private agendamentoService: AgendamentoService,
    
  ) {
    this.gerarHorarios();
  }

  // Função para gerar os horários de agendamento
  gerarHorarios() {
    const horaInicio = 8; // Hora de início (08:00)
    const horaFim = 17;   // Hora de término (17:00)
    const intervalo = 30;  // Intervalo de 30 minutos

    // Gerar os horários de 30 em 30 minutos
    for (let h = horaInicio; h <= horaFim; h++) {
      for (let m = 0; m < 60; m += intervalo) {
        const horaFormatada = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
        this.horarios.push(horaFormatada);
      }
    }
  }

  // Função para enviar o formulário de agendamento
  enviarFormulario() {
    // Verificar se a data é válida (não pode ser fim de semana, feriado ou inferior a 3 dias)
    if (this.isDataValida(this.cliente.data)) {
      // Verificar se todos os campos estão preenchidos
      if (this.cliente.nome && this.cliente.email && this.cliente.telefone && this.cliente.data && this.cliente.horario) {

        // Enviar o agendamento para o serviço
        this.agendamentoService.agendarSessao(this.cliente).subscribe(
          response => {
            alert('Sessão agendada com sucesso!');
            this.limparFormulario(); // Limpar o formulário após o envio
          },
          error => {
            alert('Ocorreu um erro ao agendar a sessão.');
            console.error('Erro:', error);
          }
        );
      } else {
        alert('Por favor, preencha todos os campos.');
      }
    } else {
      alert('A consulta não pode ser agendada em sábados, domingos, feriados ou com menos de 3 dias de antecedência.');
    }
  }

  // Função para verificar se a data de agendamento é válida
  isDataValida(data: string): boolean {
    const dataAtual = new Date();
    const dataConsulta = new Date(data);

    // Zera a hora da data para garantir que estamos apenas comparando o dia
    dataConsulta.setHours(0, 0, 0, 0);

    // Verificar se a data é inferior à data atual ou inferior a 3 dias
    if (dataConsulta <= dataAtual) {
      return false; // A data não pode ser no passado ou no mesmo dia
    }

    const tresDiasDepois = new Date(dataAtual);
    tresDiasDepois.setDate(dataAtual.getDate() + 3);

    if (dataConsulta < tresDiasDepois) {
      return false; // A data não pode ser inferior a 3 dias a partir de hoje
    }

    // Verificar se a data é um sábado (6) ou domingo (0)
    const diaDaSemana = dataConsulta.getDay();
    if (diaDaSemana === 0 || diaDaSemana === 6) {
      return false;  // Sábado ou domingo
    }

    // Verificar se a data é um feriado
    const dataFormatada = dataConsulta.toISOString().split('T')[0];  // Formato YYYY-MM-DD
    if (this.feriados.includes(dataFormatada)) {
      return false;  // Feriado
    }

    return true;  // Data válida (não é fim de semana, feriado ou inferior a 3 dias)
  }

  // Função para limpar o formulário após o envio
  limparFormulario() {
    this.cliente = {
      nome: '',
      email: '',
      telefone: '',
      data: '',
      horario: ''
    };
  }
}
