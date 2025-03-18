import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DepoimentosComponent } from './components/pages/depoimentos/depoimentos.component';
import { AgendamentoComponent } from './components/pages/agendamento/agendamento.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [AppComponent,
                 HomeComponent,
                 AboutComponent,
                 NavbarComponent,
                 FooterComponent,
                 DepoimentosComponent,
                 AgendamentoComponent,
              
                ],
  imports: [BrowserModule,
            AppRoutingModule,
            FormsModule,
            HttpClientModule,
            BrowserAnimationsModule,
           
          ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
  
