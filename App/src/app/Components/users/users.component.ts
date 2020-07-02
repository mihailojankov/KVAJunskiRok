import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/login.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './../../Models/user'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  dodateRole = [];

  formaZaDodavanjeUsera;

  constructor(private http: HttpClient, public loginService: LoginService,
              private router:Router, private builder:FormBuilder) {
    this.formaZaDodavanjeUsera = builder.group({
      id:0,
      username:"",
      password:"",
      roles:[]
    } as User);
  }

  ngOnInit(): void {
    this.dobaviSve();
  }

  dobaviSve(){
    this.http.get<User[]>('http://localhost:8080/api/users').subscribe(r => {
      this.users = r;
      this.formaZaDodavanjeUsera.id = this.users.length + 1;
    });
  }

  brisanje(id){
    this.http.delete('http://localhost:8080/api/users/' + id).subscribe(r => {
      this.dobaviSve();
    });
  }

  dodavanje(value){

    value.roles = this.dodateRole;

    this.http.post('http://localhost:8080/api/users', value).subscribe(r => {
      this.dobaviSve()
    });
  }

  detalji(idUsera){
    this.router.navigate(["users/detaljiUser"], { queryParams: { id: idUsera } });
  }

  dodajRole(e){
    if(e.target.checked){
      this.dodateRole.push(e.target.value);
    }
    else{
      let index = this.dodateRole.indexOf(e.target.value);
      this.dodateRole.splice(index, 1);
    }

    console.log(this.dodateRole);

  }

}
