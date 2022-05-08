import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styles: [
  ]
})
export class PostsComponent implements OnInit {

  mensajes: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.mensajes = this.dataService.getPosts();
  }

  escuchaClick(id: number) {
    console.log('Click en: ', id);
  }

}
