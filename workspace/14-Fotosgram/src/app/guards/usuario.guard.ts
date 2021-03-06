import { Injectable } from '@angular/core';
import { CanLoad, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanLoad {

  constructor(private usuarioService: UsuarioService) { }

  canLoad(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.usuarioService.validaToken();
  }

}
