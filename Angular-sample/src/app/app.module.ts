import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';

import { UserService } from './user/user.service';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from './chat/chat.service';
import { SearchListComponent } from './web-search/search-list/search-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    UserListComponent,
    UserEditComponent,
    ChatComponent,
    SearchListComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [UserService, ChatService],
  bootstrap: [AppComponent],
})
export class AppModule {}
