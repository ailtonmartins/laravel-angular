import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Task} from "../model/task";

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  endpoint: string = 'http://localhost:8000/api/task';

  constructor(private http: HttpClient) { }

  get(query='') {
    return this.http.get<Task[]>(this.endpoint+'?'+query);
  }

  getById(id: number) {
    return this.http.get<Task>(this.endpoint + '/' + id);
  }

  create(user: Task) {
    return this.http.post(this.endpoint, user);
  }

  update(user: Task) {

      const headers = new HttpHeaders()
      .set("Content-Type", "application/json");

    let url = this.endpoint + '/' + user.id;

    return this.http.put(url, JSON.stringify(user),   {headers});
  }

  delete(id: number) {
    return this.http.delete(this.endpoint + '/' + id);
  }
}
