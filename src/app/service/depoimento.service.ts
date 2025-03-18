import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Depoimento {
  id?: number;
  texto: string;
  autor: string;
}

@Injectable({
  providedIn: 'root'
})
export class DepoimentoService {
  private apiUrl = 'http://localhost:3000/depoimentos';

  constructor(private http: HttpClient) {}

  getDepoimentos(): Observable<Depoimento[]> {
    return this.http.get<Depoimento[]>(this.apiUrl);
  }

  adicionarDepoimento(depoimento: Depoimento): Observable<Depoimento> {
    return this.http.post<Depoimento>(this.apiUrl, depoimento);
  }
}
