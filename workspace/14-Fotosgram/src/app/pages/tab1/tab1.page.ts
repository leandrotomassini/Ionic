import { Component, OnInit } from '@angular/core';

import { Post } from 'src/app/interfaces/interfaces';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  posts: Post[] = [];
  habilitado = true;

  constructor(private postService: PostsService) { }

  ngOnInit(): void {
    this.siguientes();
    this.postService.nuevoPost.subscribe(post => {
      this.posts.unshift(post);
    });
  }

  siguientes(event?, pull: boolean = false) {


    this.postService.getPosts(pull)
      .subscribe(resp => {

        console.log(resp);
        this.posts.push(...resp.posts);

        if (event) {

          event.target.complete();

          if (resp.posts.length === 0) {
            this.habilitado = false;
          }
        }

      });

  }

  recargar(event) {
    this.posts = [];
    this.habilitado = true;
    this.siguientes(event, true);
  }

}
