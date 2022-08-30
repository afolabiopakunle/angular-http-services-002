import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getPosts() {
   return this.http.get(this.url).pipe(catchError(this.errorHandler))
  }

  createPost(post) {
    return this.http.post(this.url, post)
  }

  updatePosts(post) {
    return this.http.patch(this.url + '/' + post.id, {isRead: true})
  }

  deletePost(id) {
    return this.http.delete(this.url + '/' + id)
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "server error.");
  }
}