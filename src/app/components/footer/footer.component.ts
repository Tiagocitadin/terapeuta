import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  whatsappNumber = environment.whatsappNumber;
  mensagemPadrao = environment.mensagemPadrao;
  instagramUser = environment.instagramUser;

  get whatsappLink(): string {
    const textoCodificado = encodeURIComponent(this.mensagemPadrao);
    return `https://wa.me/${this.whatsappNumber}?text=${textoCodificado}`;
  }

  get instagramLink(): string {
    return `https://www.instagram.com/${this.instagramUser}`;
  }
}
