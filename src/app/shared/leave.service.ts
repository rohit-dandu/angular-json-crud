import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Leave} from '../leaves-dashboard/leave';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  uri: string = 'http://localhost:3000/data/';
  typeOfLeave : string[] = ['sick', 'vacation'];
  constructor(private http: HttpClient) { }

  // async getLeaves() {
  //   // let url = 'assets/leaves.json'
  //   // return this.http.get<any>('assets/products.json').pipe()
  //   // .then(res => <Leave[]>res.data)
  //   // .then(data => { return data; });
  //   const res = await fetch('../assets/leaves.json');
  //   const data = res.json();
  //   return data;
  //   console.log(data);
  // }
  // getLeaves() {
  //   return this.http.get<any>('htpps://localhost:3000/')
  //   .toPromise()
  //   .then(res => <Leave[]>res.data)
  //   .then(data => { return data; });
  // }

  getLeaves() {
    return this.http.get<any>(`${this.uri}`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteLeave(id: number) {
    console.log('deleting');
    console.log('http://localhost:3000/data/' + id);
    return this.http.delete<any>(`${this.uri}` + id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  editLeave(leave: any) {
    let id = leave.id;
    return this.http.put<any>(`${this.uri}`+ id, leave)
    .pipe(map((res:any) => {
      return res;
    }))
  }

  submitLeave(leave: any) {
    return this.http.post<any>(`${this.uri}`, leave)
    .pipe(map((res:any) => {
      return res;
    }))
  }
}