import {Component, OnInit, ViewChild} from '@angular/core';
import {TasksService} from "../service/tasks.service";
import {Task} from "../model/task";
import {MatDialog, MatPaginator, MatSnackBar, MatSort} from '@angular/material';
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

  constructor( public service:TasksService , public dialog: MatDialog ,  public snackBar: MatSnackBar) {

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
                                    this.tasks = data;
                                 });
  }

  reloadList() {
     this.paginator._changePageSize(5);
  }

  updateStatus(row) {
    row.status = !row.status;
    this.isLoadingResults = true;
    this.service.update( row ).subscribe( (data) => {
      this.snackBar.open('Alterado o status com sucesso', 'Salvo', {
        duration: 2000,
      });
      this.isLoadingResults = false;
      this.reloadList();
    } , (error) => {
      this.snackBar.open('Erro ao salvar', 'Erro', {
        duration: 2000,
      });
    });
  }

  delete(row) {
    this.isLoadingResults = true;
    this.service.delete( row.id ).subscribe( (data) => {
      this.snackBar.open('Deletado com sucesso', 'Salvo', {
        duration: 2000,
      });
      this.isLoadingResults = false;
      this.reloadList();
    } , (error) => {
      this.snackBar.open('Erro ao deletar', 'Erro', {
        duration: 2000,
      });
    });
  }

  editar( row ) {

      const parent = this;
      const dialogRef = this.dialog.open(TaskActionComponent, {
        width: '400px',
        data: { value: row , event : function() {
                                                   parent.reloadList();
                                                }
              }
      });
  }

  novo( row ) {

    const parent = this;
    const dialogRef = this.dialog.open(TaskActionComponent, {
      width: '400px',
      data: { event : function() {
          parent.reloadList();
        }
      }
    });
  }


}
