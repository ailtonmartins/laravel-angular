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
    @Inject(MAT_DIALOG_DATA) public data , public service: TasksService , public snackBar: MatSnackBar) {

    if ( this.data ) {
        this.value['id'] = this.data.id;
        this.value['titulo'] = this.data.titulo;
        this.value['descricao'] = this.data.descricao;
        this.value['status'] = this.data.status;
    }

  }

  save () {

    if (this.data) {
          this.service.update( this.value ).subscribe( (data) => {
            this.close();
            this.snackBar.open('Salvo com sucesso', 'Salvo', {
              duration: 2000,
            });
          } , (error) => {
              this.snackBar.open('Erro ao salvar', 'Erro', {
                duration: 2000,
              });
          });
    } else {

    }

  }

  close(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

  }

}
