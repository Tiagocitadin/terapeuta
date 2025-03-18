import { Component } from '@angular/core';
import { DepoimentoService } from 'src/app/service/depoimento.service';

interface Depoimento {
  id?: number;
  texto: string;
  autor: string;
}


@Component({
  selector: 'app-depoimentos',
  templateUrl: './depoimentos.component.html',
  styleUrls: ['./depoimentos.component.css']
})
export class DepoimentosComponent {
  depoimentos: Depoimento[] = [];
  novoDepoimento: Depoimento = { texto: '', autor: '' };

  constructor(private depoimentoService: DepoimentoService) {}

  ngOnInit() {
    this.carregarDepoimentos();
  }

  carregarDepoimentos() {
    this.depoimentoService.getDepoimentos().subscribe((data) => {
      this.depoimentos = data;
    });
  }

  adicionarDepoimento() {
    if (this.novoDepoimento.texto.trim() && this.novoDepoimento.autor.trim()) {
      this.depoimentoService.adicionarDepoimento(this.novoDepoimento).subscribe((depoimento) => {
        this.depoimentos.push(depoimento);
        this.novoDepoimento = { texto: '', autor: '' };
      });
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }

}
