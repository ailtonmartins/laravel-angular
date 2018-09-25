import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from "./tasks/tasks.component";
import { TaskActionComponent } from "./tasks/action/task.action.component";

const routes: Routes = [
  { path: 'tasks', component: TasksComponent },
  { path: 'tasks/new', component: TaskActionComponent },
  { path: 'tasks/:id', component: TaskActionComponent },
  { path : '', component : TasksComponent}
];

export const routing = RouterModule.forRoot(routes);
