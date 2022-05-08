import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { environment } from 'src/environments/environment';
import { Post, RespuestaPosts } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPosts = 0;

  nuevoPost = new EventEmitter<Post>();

  constructor(private http: HttpClient, private usuarioService: UsuarioService, private fileTransfer: FileTransfer) { }

  getPosts(pull: boolean = false) {

    if (pull) {
      this.paginaPosts = 0;
    }

    this.paginaPosts++;
    return this.http.get<RespuestaPosts>(`${URL}/posts/?pagina=${this.paginaPosts}`);
  }

  crearPost(post) {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return new Promise(resolve => {

      this.http.post(`${URL}/posts`, post, { headers })
        .subscribe(resp => {
          this.nuevoPost.emit(resp['post']);
          resolve(true);
        });
    });
  }

  subirImagen(img: string) {

    const options: FileUploadOptions = {

      fileKey: 'image',

      headers: {
        'x-token': this.usuarioService.token
      }
    }

    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    fileTransfer.upload(img, `${URL}/posts/upload`, options)
      .then(data => {
        console.log(data);
      }).catch(err => {
        console.log('Error en carga de la imágen. ', err);
      });
  }

}
