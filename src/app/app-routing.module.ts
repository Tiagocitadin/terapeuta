import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { AgendamentoComponent } from './components/pages/agendamento/agendamento.component';
import { DepoimentosComponent } from './components/pages/depoimentos/depoimentos.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'agendamento', component: AgendamentoComponent },
  { path: 'depoimentos', component: DepoimentosComponent },
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
