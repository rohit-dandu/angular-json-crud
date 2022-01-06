import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class UserService {
    private user:any = undefined;

    setUserDetails(user:any) {
      this.user = user;
      localStorage.setItem('loginUser', JSON.stringify(this.user));
    }

    getUserDetails():any{
      const loginUser = JSON.parse(localStorage.getItem('loginUser') || '{}')
      console.log(loginUser);
      return loginUser;
    }
}
