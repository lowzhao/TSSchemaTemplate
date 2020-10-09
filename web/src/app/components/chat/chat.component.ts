import { User } from './../../../generated/graphql';
import { AuthService, DeepPartial } from './../../service/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit
{

  chats: {author: DeepPartial<User>, text: string}[] = [
    {
      author: {
        name: 'Person 1',
        color: 'blue'
      }, text: 'test'
    },
    {
      author: {
        name: 'Person 2',
        color: 'white'
      }, text: 'test2'
    },
  ]

  constructor(private authS: AuthService) { }

  async ngOnInit(): Promise<void>
  {
  }

  async addChat(chatInputEl: HTMLTextAreaElement): Promise<void>
  {
    if (this.authS.user)
    {
      this.chats.push({ author: this.authS.user, text: chatInputEl.value });
      chatInputEl.value = '';
    } else
    {
      alert('Please log in.');
    }
  }
}
