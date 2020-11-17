import { replaceEmoji } from './../../../../../utility/chatUtil';
import { User, ChatsGQL, CreateChatGQL } from './../../../generated/graphql';
import { AuthService, DeepPartial } from './../../service/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit
{

  chats: { author: DeepPartial<User>, text: string }[];

  constructor(
    private authS: AuthService,
    private chatsGQL: ChatsGQL,
    private chatCreateGQL: CreateChatGQL
  ) { }

  async ngOnInit(): Promise<void>
  {
    this.chats = (await this.chatsGQL.fetch().toPromise()).data.chats;
    this.chats = this.chats.map(chat =>
      ({ text: replaceEmoji(chat.text), author: chat.author })
    );
  }

  async addChat(chatInputEl: HTMLTextAreaElement): Promise<void>
  {
    if (this.authS.user)
    {
      const cc = (await this.chatCreateGQL.mutate({ text: chatInputEl.value }).toPromise()).data.chatCreate;

      // DONE: Fix filter emoji function
      cc.text = replaceEmoji(cc.text);

      this.chats.push(cc);
      chatInputEl.value = '';
    } else
    {
      alert('Please log in.');
    }
  }
}
