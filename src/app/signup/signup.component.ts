import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { catchError, map } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm !: FormGroup;
  
  constructor(private formBuilder : FormBuilder, private http: HttpClient, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name:['', Validators.required],
      email:['', Validators.required],
      password:['', Validators.required]
    })
  }

  register() {
    this.http.post<any>("http://localhost:3000/registered", this.signupForm.value)
    .pipe(map((res:any) => {
      this.signupForm.reset()
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'User Registered!', life: 3000});
        setTimeout(() =>{
          this.router.navigate(['login'])
        }, 2000); 
    }), catchError (err => {
      throw 'error: ' + err;
    })
    ).subscribe (
      err=> console.log(err)
    );
  }
}
