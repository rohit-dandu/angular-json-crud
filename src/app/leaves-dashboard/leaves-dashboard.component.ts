import { Component, OnInit, Input } from '@angular/core';
import {MenuItem} from 'primeng/api';

import { Leave } from './leave';

import { LeaveService } from '../shared/leave.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { UserService } from '../shared/user.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-leaves-dashboard',
  templateUrl: './leaves-dashboard.component.html',
  styleUrls: ['./leaves-dashboard.component.css']
})
export class LeavesDashboardComponent implements OnInit {

  leaveDialog !: boolean;
  leaves !: Leave[];
  leave !: Leave;
  selectedLeaves !: Leave[];
  submitted !: boolean;

  items !: MenuItem[];

  user:any;

  constructor(private leaveService: LeaveService, private messageService: MessageService, private confirmationService: ConfirmationService, private userService: UserService, private router: Router) {
  }
  
  ngOnInit(): void {
    // this.leaveService.getLeaves().then(data => this.leaves = data);
    
    this.user = this.userService.getUserDetails();
    // let loginUser = this.user;

    // localStorage.setItem('loginUser', JSON.stringify(this.user));

    this.getLeaveDetails();
    this.items = [
    {
      label: 'New',
      icon:'pi pi-fw pi-plus',
      command: () => {
        this.openNew();
      }
    },
    {
      label: 'Delete',
      icon:'pi pi-fw pi-trash',
      command: () => this.deleteSelectedLeaves()
    },
    {
      label: this.user.name,
      icon:'pi pi-fw pi-user',
      items: [
        {label: 'Logout', icon: 'pi pi-fw pi-power-off', routerLink: ['/login'], command: () => {
          localStorage.clear();
        }}
      ],
      style: {'margin-left': 'auto'}
    }
    ];
  }

  getLeaveDetails() {
    this.leaveService.getLeaves().subscribe(res =>{
      let userLeavesList:any = [];
      res.filter((l:any) => {
        if(l.name === this.user.name) {
          userLeavesList.push(l);
        }
        console.log(l);
      });
      this.leaves = userLeavesList;
    })
  }
  openNew() {
    this.leave = {};
    this.leave.name = this.user.name;
    // this.leave.id = this.createId();
    this.submitted = false;
    this.leaveDialog = true;
  }

  deleteSelectedLeaves() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected leaves?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.selectedLeaves.forEach( (leave) => {
              console.log(leave.id);
              this.leaveService.deleteLeave(leave.id!).subscribe (
                () => {}
              )
            });
            this.leaves = this.leaves.filter(val => !this.selectedLeaves.includes(val));
            this.selectedLeaves = [];
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Leaves Deleted', life: 3000});
        }
    });
  }

  editLeave(leave: Leave) {
    this.leave = {...leave};
    this.leave.name = this.user.name;
    console.log(this.leave);
    this.leaveDialog = true;
  }

  deleteLeave(leave: Leave) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + leave.name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.leaveService.deleteLeave(leave.id!).subscribe(
              () => console.log('Deleted!')
            );
            this.leaves = this.leaves.filter(val => val.id !== leave.id);
            this.leave = {};
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Leave Deleted', life: 3000});
        }
    });
  }

  hideDialog() {
      this.leaveDialog = false;
      this.submitted = false;
  }

  saveLeave() {
      this.submitted = true;
      if (this?.leave?.name?.trim()) {
          if (this.leave.id) {
            console.log('In edit leave')
              this.leaves[this.findIndexById(this.leave.id)] = this.leave;
              this.leaveService.editLeave(this.leave).subscribe(
                () => console.log('Leave updated')
              );            
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Leave Updated', life: 3000});
          }
          else {
            console.log('In new leave')
              // this.leave.id = this.createId();
              this.leaves.push(this.leave);
              this.leaveService.submitLeave(this.leave).subscribe(
                () => console.log('Leave submitted')
              ); 
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Leave Created', life: 3000});
          }
          this.leaves = [...this.leaves];
          this.leaveDialog = false;
          this.leave = {};
      }
      // location.reload();
  }

  findIndexById(id: number): number {
      let index = -1;
      for (let i = 0; i < this.leaves.length; i++) {
          if (this.leaves[i].id === id) {
              index = i;
              break;
          }
      }
      return index;
  }

  createId(): number {
    let sid = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < 5; i++ ) {
        sid += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    let id = parseInt(sid);
    return id;
  }

}