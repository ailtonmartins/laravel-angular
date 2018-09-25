import {Component, OnInit, ViewChild} from '@angular/core';
import {TasksService} from "../service/tasks.service";
import {Task} from "../model/task";
import {MatDialog, MatPaginator, MatSort} from "@angular/material";
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {TaskActionComponent} from "./action/task.action.component";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [TasksService]
})
export class TasksComponent implements OnInit {


  tasks = [];

  displayedColumns: string[] = ['titulo', 'descricao', 'status', 'create_at' , 'action'];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( public service:TasksService , public dialog: MatDialog) {

  }

  ngOnInit() {

    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.service.get( 'page=' + (this.paginator.pageIndex+1) );
        }),
        map(data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data['total'];

          return data['data'];
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe((data) => {
                                    this.tasks = data
                                 });
  }

  editar( row ) {
      const dialogRef = this.dialog.open(TaskActionComponent, {
        width: '250px',
        data: row
      });
  }

}
