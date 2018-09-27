import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Task} from "../model/task";
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  endpoint = '';

  constructor( private http: HttpClient ) {
    this.endpoint = environment.url +  '/task';
  }

  get(query = '') {
    return this.http.get<Task[]>(this.endpoint + '?' + query );
  }

  getById(id: number) {
    return this.http.get<Task>(this.endpoint + '/' + id);
  }

  create(task: Task) {
    return this.http.post<Task>(this.endpoint, task);
  }

  update(task: Task) {
    return this.http.put<Task>( this.endpoint + '/' + task.id, task );
  }

  delete(id: number) {
    return this.http.delete(this.endpoint + '/' + id);
  }
}
