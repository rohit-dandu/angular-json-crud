import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, map } from 'rxjs';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm !: FormGroup;
  userDetails : {} = {};
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private messageService: MessageService, private userService: UserService) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }

  login() {
    this.http.get<any>("http://localhost:3000/registered")
    .pipe(map((res => {
      const user = res.find((a:any) => {
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password;
      });
      if(user) {
        this.userDetails = user;
        this.userService.setUserDetails(this.userDetails);
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Logged in!', life: 3000});
        this.loginForm.reset();
        setTimeout(() =>{
          this.router.navigate(['dashboard'])
        }, 1000); 
      } else {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'User does not exist!', life: 3000});
      }
    })), catchError (err => {
      throw 'error: ' + err;
    })
    ).subscribe (
      err=> console.log(err)
    );
  }
}
