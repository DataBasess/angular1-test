import { Component, OnInit } from '@angular/core';
import { User } from '../../model/User';
import { UserService } from '../../service/user.service';
import { error } from 'util';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user:User = {firstname:'',lastname:''};
  users:User[];
  key:string;

  constructor(
    private userService:UserService
  ) { }

  ngOnInit() {
    this.getListUser();
  }

  save(user:User){
    console.log(user);
    this.userService.saveUser(user).then(res=>{
      
      console.log(res);
   
    });

  }

  async getListUser(){
    await this.userService.getUserList().subscribe(userList=>{
      this.users =userList;
      console.log(this.users);
    })
  }

  modify(user){
    this.key = user.$key;
    this.user = user;
  }
  update(user:User){
    console.log(user);
    this.userService.UpdateUser(this.key,user).then(res=>{
      
      console.log(res);
      this.key='';
      this.user = {firstname:'',lastname:''};
   
    });
}

  remove(key:string){
    this.userService.removeUser(key).then(res=>{
      console.log(res);
    })
  }
}
