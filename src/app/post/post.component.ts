import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { PostService } from '../services.ts/post.service';

interface IPost {
  body: string;
  id: number;
  userId: number;
  title: string;
}
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts: IPost[];

  constructor(private postService: PostService) {

  }

  ngOnInit() {
    this.postService.getPosts()
    .subscribe((response: IPost[]) => {
      this.posts = response
    });
  }

  createPost(input: HTMLInputElement) {
    let post =  {
      title: input.value, 
      id: 0, 
      body: '', 
      userId: 0
    }
    console.log(post)
    input.value = '';
      // this.http.post(this.url, post)
      // .subscribe((response:IPost) => {
      //   console.log(response)
      //   post['title'] = response.title
      //   post['id'] = response.id
      //   post['body'] = ''
      //   post['userId'] = 0
      //   this.posts.unshift(post)
      // })
  }

  updatePost(post) {
    // this.http.patch(this.url + '/' + post.id, {isRead: true})
    // .subscribe(response => {
    //   console.log(response)
    // })
  }

  deletePost(post) {
    // this.http.delete(this.url + '/' + post.id)
    // .subscribe(response => {
    //   let index = this.posts.indexOf(post)
    //   this.posts.splice(index, 1)
    // })
  }
}