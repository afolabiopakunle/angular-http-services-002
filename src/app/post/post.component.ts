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
    .subscribe(
      (response: IPost[]) => {
      this.posts = response
    }, 
    (error: Response) => {
      if(error?.status === 400) {
        alert('An expected error error')
      }
      alert('An unexpected error occured!');
      console.log(error)
    }
    );
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
      this.postService.createPost(post)
      .subscribe(
        (response:IPost) => {
        console.log(response)
        post['title'] = response.title
        post['id'] = response.id
        post['body'] = ''
        post['userId'] = 0
        this.posts.unshift(post)
      }, error => {
        alert('An unexpected error occured')
        console.log(error)
      })
  }

  updatePost(post) {
    this.postService.updatePosts(post)
    .subscribe(
      response => {
      console.log(response)
    }, error => {
      console.log(error)
    })
  }

  deletePost(post) {
   this.postService.deletePost(878) 
    .subscribe(
      response => {
      let index = this.posts.indexOf(post)
      this.posts.splice(index, 1)
    }, (error: Response) => {
      if(error.status === 404) {
        alert('This post has been deleteeeeeee')
      }
      alert('An unexpected error occured');
      console.log(error)
    })
  }
}