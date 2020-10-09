import { AuthService } from './service/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent
{
  title = 'ui';
  chats = [
    { author: 'Person 1', text: 'test' },
    { author: 'Person 2', text: 'test2' },
  ]


  constructor(private authS: AuthService){}
 
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  async addChat(chatInputEl: HTMLTextAreaElement): Promise<void>
  {
    this.chats.push({ author: this.authS.user.name, text: chatInputEl.value });
    chatInputEl.value = '';
  }

}
