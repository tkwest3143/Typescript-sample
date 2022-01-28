import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Chat } from '../model/chat';
import { Room } from '../model/room';
import { User } from '../model/user';
import { ChatService } from './chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit , AfterViewInit{
  chats!: Chat[];
  coment: string = "";
  roomId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ChatService) { }
  ngAfterViewInit(): void {
    let target = document.getElementById('chat-history');
    target?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest"
    });
  }

  ngOnInit(): void {
    this.roomId = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getChats("1").subscribe(res => {
      this.chats = res;
      console.log("date*:::*" + this.chats[0].createdAt.getDate);
    });
    
  }

  onSend(form: NgForm): void {
    const user: User = new User();
    user.id = 1;
    const room: Room = new Room();
    room.id = this.roomId;
    const chat: Chat = new Chat();
    chat.comment = form.value.comment;
    chat.contributor = user;
    chat.room = room;
    console.log(form.value.comment);
    this.service.postChats(chat).subscribe(() => {
      form.resetForm();
      this.ngOnInit();
    });
  }

}
