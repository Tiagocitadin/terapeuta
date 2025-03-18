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

  feriados: string[] = [];
  horarios: string[] = [];

  constructor(private agendamentoService: AgendamentoService) {
    this.gerarFeriados();
    this.gerarHorarios();
  }

  // Função para gerar os feriados do ano atual
  gerarFeriados() {
    const anoAtual = new Date().getFullYear();
    this.feriados = [
      `${anoAtual}-01-01`,  // Ano Novo
      this.calcularCarnaval(anoAtual),  // Carnaval
      `${anoAtual}-04-21`,  // Tiradentes
      `${anoAtual}-05-01`,  // Dia do Trabalhador
      this.calcularCorpusChristi(anoAtual),  // Corpus Christi
      `${anoAtual}-09-07`,  // Independência do Brasil
      `${anoAtual}-10-12`,  // Nossa Senhora Aparecida
      `${anoAtual}-11-02`,  // Finados
      `${anoAtual}-11-15`,  // Proclamação da República
      `${anoAtual}-12-25`   // Natal
    ];
  }

  // Função para calcular o Carnaval (47 dias antes da Páscoa)
  calcularCarnaval(ano: number): string {
    const pascoa = this.calcularPascoa(ano);
    const carnaval = new Date(pascoa);
    carnaval.setDate(pascoa.getDate() - 47); // Carnaval é 47 dias antes da Páscoa
    return carnaval.toISOString().split('T')[0];
  }

  // Função para calcular Corpus Christi (60 dias após a Páscoa)
  calcularCorpusChristi(ano: number): string {
    const pascoa = this.calcularPascoa(ano);
    const corpusChristi = new Date(pascoa);
    corpusChristi.setDate(pascoa.getDate() + 60); // Corpus Christi é 60 dias após a Páscoa
    return corpusChristi.toISOString().split('T')[0];
  }

  // Função para calcular a data da Páscoa
  calcularPascoa(ano: number): Date {
    const a = ano % 19;
    const b = Math.floor(ano / 100);
    const c = ano % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const mes = Math.floor((h + l - 7 * m + 114) / 31);
    const dia = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(ano, mes - 1, dia);
  }

  // Função para gerar os horários de agendamento
  gerarHorarios() {
    this.horarios = []; // Zera a lista antes de gerar

    const horariosManha = this.gerarIntervalos(8, 12, 30); // 08:00 às 12:00
    const horariosTarde = this.gerarIntervalos(13, 18, 30); // 13:00 às 17:30

    this.horarios = [...horariosManha, ...horariosTarde];
  }

  // Função para gerar horários com intervalo definido
  gerarIntervalos(horaInicio: number, horaFim: number, intervalo: number): string[] {
    let horarios: string[] = [];

    for (let h = horaInicio; h < horaFim; h++) {
      for (let m = 0; m < 60; m += intervalo) {
        if (h === Math.floor(horaFim) && m > 0) break; // Impede horários acima do limite
        const horaFormatada = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
        horarios.push(horaFormatada);
      }
    }
    return horarios;
  }

  // Função para enviar o formulário de agendamento
  enviarFormulario() {
    const mensagemErro = this.validarData(this.cliente.data);

    if (mensagemErro) {
      alert(mensagemErro);
      return;
    }

    if (this.cliente.nome && this.cliente.email && this.cliente.telefone && this.cliente.data && this.cliente.horario) {
      this.agendamentoService.agendarSessao(this.cliente).subscribe(
        response => {
          alert('Sessão agendada com sucesso!');
          this.limparFormulario();
        },
        error => {
          alert('Ocorreu um erro ao agendar a sessão.');
          console.error('Erro:', error);
        }
      );
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }

  // Função para validar a data
  validarData(data: string): string | null {
    const dataAtual = new Date();
    const dataConsulta = new Date(data);
    dataConsulta.setHours(0, 0, 0, 0); // Garantir que a hora seja 00:00:00

    // Função para formatar a data no formato YYYY-MM-DD
    const formatarData = (data: Date): string => {
      return data.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    };

    // Formatar a data de consulta
    const dataFormatada = formatarData(dataConsulta);

    // Verificar se a data escolhida é um feriado
    if (this.feriados.includes(dataFormatada)) {
      return 'A consulta não pode ser agendada em um feriado.';
    }

    // Verificar se a data é anterior à atual
    if (dataConsulta < dataAtual) {
      return 'A data escolhida não pode ser anterior a atual.';
    }

    // Verificar se é sábado ou domingo
    const diaDaSemana = dataConsulta.getDay();
    if (diaDaSemana === 0 || diaDaSemana === 6) {
      return 'A consulta não pode ser agendada em sábados ou domingos.';
    }

    return null; // Retorna null se a data for válida
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
