import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ServicosComponent } from './components/pages/servicos/servicos.component';
import { DepoimentosComponent } from './components/pages/depoimentos/depoimentos.component';
import { AgendamentoComponent } from './components/pages/agendamento/agendamento.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent,
                 HomeComponent,
                 AboutComponent,
                 NavbarComponent,
                 FooterComponent,
                 ServicosComponent,
                 DepoimentosComponent,
                 AgendamentoComponent
                ],
  imports: [BrowserModule,
            AppRoutingModule,
            FormsModule,
            HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
