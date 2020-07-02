import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/login.service';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormBuilder } from '@angular/forms';
import { Task } from './../../Models/task';


@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css']
})
export class SecondComponent implements OnInit {

  tasks: Task[];
  formaTask;

  progress = [];
  done = [];

  constructor(private http: HttpClient, 
    public loginService: LoginService, 
    private router:Router, private builder:FormBuilder) {
      this.formaTask = builder.group({
        id:0,
        title: null,
        description: null,
        status: null
      } as Task);
    }

  ngOnInit(): void {
    this.dobaviSve();
  }

  dobaviSve(){
    this.http.get<Task[]>('http://localhost:8080/api/tasks').subscribe(r => {
      this.tasks = r;

      this.progress = [];
      this.done = [];

      for(let i = 0; i< this.tasks.length; i++){
        if(this.tasks[i].status == "in progress"){
          this.progress.push(this.tasks[i]);
        }
        if(this.tasks[i].status == "done"){
          this.done.push(this.tasks[i]);
        }
      }
     
    });
  }

  brisanje(id){
    this.http.delete('http://localhost:8080/api/tasks/' + id).subscribe(r => {
      this.dobaviSve();
    });
  }

  dodavanje(data){

    data.id = this.tasks.length + 1;

    this.http.post('http://localhost:8080/api/tasks', data).subscribe(r => {
      this.dobaviSve()
    });
  }

  detalji(idFajla){
    this.router.navigate(["second/detaljiSecond"], { queryParams: { id: idFajla } });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      
      let obj = event.previousContainer.data[event.previousIndex];
      console.log(obj);


      

      if(this.izmeniDirektorijum(obj)){
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      }
      
    }

  }

  izmeniDirektorijum(obj):boolean{

    if(obj["status"] == "in progress"){
      obj["status"] = "done"; 
      this.http.put('http://localhost:8080/api/tasks/' + obj["id"], obj).subscribe(data => this.dobaviSve());
      return true;
    }
    else if(obj["status"] == "done" && this.loginService.validateRoles(['ROLE_ADMIN'])){
      obj["status"] = "in progress"; 
      this.http.put('http://localhost:8080/api/tasks/' + obj["id"], obj).subscribe(data => this.dobaviSve());
      return true;
    }
    else{
      window.alert("Nemate dozvolu");
      return false;
    }
  }

}
