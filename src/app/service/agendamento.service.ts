import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  private apiUrl = 'http://localhost:3000/clientes'; // URL da API simulada

  constructor(private http: HttpClient) { }

  agendarSessao(cliente: any): Observable<any> {
    return this.http.post(this.apiUrl, cliente);
  }
}
