import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UiService} from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, AfterViewInit {

  @ViewChild('slidePrincipal', { static: false }) slides: IonSlides;

  loginUser = {
    email: 'test1@test.com',
    password: '12345678'
  };

  registerUser: Usuario = {
    email: 'test',
    password: '123456',
    nombre: 'Test',
    avatar: 'av-1.png'
  };

  constructor(private usuarioService: UsuarioService,
    private navCtrl: NavController,
    private uiService: UiService) { }

  ngAfterViewInit(): void {
    this.slides.lockSwipes(true);
  }

  ngOnInit() { }

  async login(fLogin: NgForm) {
    if (fLogin.invalid) { return; }
    const valido = await this.usuarioService.login(this.loginUser.email, this.loginUser.password);
    if (valido) {
      // Navegar al tabs
      this.navCtrl.navigateRoot('main/tabs/tab1', { animated: true });
    } else {
      // mostrar alerta de usuario y contraseña no correctos
      this.uiService.alertaInformativa('Usuario y contraseña no son correctos.');
    }
  }

  async registro(fRegistro: NgForm) {

    if (fRegistro.invalid) { return; }

    const valido = await this.usuarioService.registro(this.registerUser);

    if (valido) {
      // Navegar al tabs
      this.navCtrl.navigateRoot('main/tabs/tab1', { animated: true });
    } else {
      // mostrar alerta de usuario y contraseña no correctos
      this.uiService.alertaInformativa('Ese correo electrónico ya se ecuentra registrado.');
    }
  }

  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }
  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }
}
