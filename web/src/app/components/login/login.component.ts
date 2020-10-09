import { User, UpdateColorGQL } from './../../../generated/graphql';
import { AuthService, DeepPartial } from './../../service/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit
{
  user: DeepPartial<User>;
  currentDate: Date;

  colors: string[] = ['red', 'green', 'light blue', 'purple', 'white', 'pink', 'orange'];

  constructor(public auth: AuthService, public updateColorGQL: UpdateColorGQL)
  {
    this.currentDate = new Date();
    setInterval(
      () => this.currentDate = new Date(),
      60 * 100
    );
  }

  async ngOnInit(): Promise<void>
  {
    this.user = await this.auth.checkLogin();
  }

  async login(name: HTMLInputElement, pass: HTMLInputElement): Promise<void>
  {
    this.user = await this.auth.login(name.value, pass.value);
  }

  async logout(): Promise<void>
  {
    this.auth.logout();
  }

  async selectColor(color): Promise<void>
  {
    this.auth.user.color = color;
    await this.updateColorGQL.mutate({ color }).toPromise();
  }
}
