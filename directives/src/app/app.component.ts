import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay} from "rxjs/operators";

export interface Todo {
  id?: number,
  title: string,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit{

  todos: Todo[] = []

  loading: boolean = false
  todoTitle: string = '';


  constructor(private http: HttpClient) {

  }

  ngOnInit(){
    this.fetchTodos()
  }

  addTodo() {
     if(!this.todoTitle.trim()){
       return
     }
      const newTodo : Todo = {
        title: this.todoTitle,
      }

     this.http.post<Todo>('https://jsonplaceholder.typicode.com/posts', newTodo)
       .subscribe(todo=>{
         this.todos.push(todo)
         this.todoTitle =''
       })
  }

  fetchTodos() {
    this.loading = true
    this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/posts?_limit=2')
      .pipe(delay(1500))
      .subscribe(todos => {
        this.todos = todos
        this.loading = false
      })
  }

  removeTodo(id: any) {
    this.http.delete<void>(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .subscribe(()=>{
        this.todos = this.todos.filter((t) => t.id !== id)
      })
  }
}
