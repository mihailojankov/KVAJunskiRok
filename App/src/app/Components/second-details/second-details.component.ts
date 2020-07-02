import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/login.service';
import { FormBuilder } from '@angular/forms';
import { Task } from 'src/app/Models/task';

@Component({
  selector: 'app-second-details',
  templateUrl: './second-details.component.html',
  styleUrls: ['./second-details.component.css']
})
export class SecondDetailsComponent implements OnInit {

  detailTask:Task;
  formaTask;

  constructor(private router:Router, 
    private http:HttpClient, 
    private route:ActivatedRoute, 
    public loginService: LoginService, private builder:FormBuilder) {
    }

  

  ngOnInit(): void {
    this.dobaviFile()
  }

  dobaviFile(){
    this.http.get<Task>('http://localhost:8080/api/tasks/' + this.route.snapshot.queryParams["id"]).subscribe(r => {
      this.detailTask = r;

      this.formaTask = this.builder.group({
        id:this.detailTask.id,
        title: this.detailTask.title,
        description: this.detailTask.description,
        status: this.detailTask.status
      });
    });
  }

  izmeni(data){
    this.http.put('http://localhost:8080/api/tasks/' + this.route.snapshot.queryParams["id"], data).subscribe(r => {
      this.router.navigate(["/second"]);
    });
  }
}
