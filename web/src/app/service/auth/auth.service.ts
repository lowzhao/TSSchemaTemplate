import { User, AuthGQL, CheckLoginGQL, SignOutGQL } from './../../../generated/graphql';
import { Injectable } from '@angular/core';

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export function dc<T>(v: T): T
{
  return JSON.parse(JSON.stringify(v));
}

@Injectable({
  providedIn: 'root'
})
export class AuthService
{

  public user: DeepPartial<User>;

  constructor(private authGQL: AuthGQL, private checkLoginGQL: CheckLoginGQL, private signOutGQL: SignOutGQL) { }

  async checkLogin(): Promise<DeepPartial<User>>
  {
    try
    {
      this.user = (await this.checkLoginGQL.fetch().toPromise()).data.checkLogin;
      this.user = dc(this.user);
    } catch {
      this.user = undefined;
    }
    return this.user;
  }

  async login(name: string, pass: string): Promise<DeepPartial<User>>
  {
    this.user = (await this.authGQL.fetch({ name, pass }, {fetchPolicy: 'no-cache'}).toPromise()).data.auth;
    this.user = dc(this.user);
    return this.user;
  }

  async logout(): Promise<boolean>
  {
    if ((await this.signOutGQL.fetch().toPromise()).data.signOut)
    {
      this.user = undefined;
      return true;
    } else
    {
      return false;
    }
  }
}
