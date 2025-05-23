import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
 
  mensagemPadrao = "ola vim pelo instagram";
  whatsappNumber = 5548999548935
  instagramUser = 'https://www.instagram.com/tiago.citadin/'
  

  get whatsappLink(): string {
    const textoCodificado = encodeURIComponent(this.mensagemPadrao);
    return `https://wa.me/${this.whatsappNumber}?text=${textoCodificado}`;
  }

  get instagramLink(): string {
    return `https://www.instagram.com/${this.instagramUser}`;
  }
}
