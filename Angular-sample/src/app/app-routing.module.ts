import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserListComponent } from './user/user-list/user-list.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'users/:id', component: UserEditComponent },
  {path:'chats/:id',component:ChatComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
