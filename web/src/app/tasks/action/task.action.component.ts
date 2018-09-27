import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from "@angular/material";
import {TasksService} from "../../service/tasks.service";
import {Task} from "../../model/task";

@Component({
  selector: 'app-task-action',
  templateUrl: './task.action.component.html',
  styleUrls: ['./task.action.component.css'],
  providers : [TasksService]
})
export class TaskActionComponent implements OnInit {

  value = new Task();

  constructor(
    public dialogRef: MatDialogRef<TaskActionComponent>,
    @Inject(MAT_DIALOG_DATA) public data ,
    public service: TasksService,
    public snackBar: MatSnackBar) {

    if ( this.data.value ) {
        this.value['id'] = this.data.value.id;
        this.value['titulo'] = this.data.value.titulo;
        this.value['descricao'] = this.data.value.descricao;
        this.value['status'] = this.data.value.status;
    }

  }

  save () {

    if (this.data.value) {
          this.service.update( this.value ).subscribe( (data) => {
            this.close();
            this.snackBar.open('Alterado com sucesso', 'Salvo', {
              duration: 2000,
            });
            this.data.event();

          } , (error) => {
              this.snackBar.open('Erro ao salvar', 'Erro', {
                duration: 2000,
              });
          });
    } else {
          this.service.create( this.value ).subscribe( (data) => {
            this.close();
            this.snackBar.open('Salvo com sucesso', 'Salvo', {
              duration: 2000,
            });
            this.data.event();
          } , (error) => {
            this.snackBar.open('Erro ao salvar', 'Erro', {
              duration: 2000,
            });
          });
    }

  }

  close(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

  }

}
