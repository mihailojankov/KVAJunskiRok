import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { Task } from 'src/app/Models/task';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  tasks:Task[];
  
  get height(): number { return parseInt(d3.select('body').style('height'), 10); }
  get width(): number { return parseInt(d3.select('body').style('width'), 10); }
  radius: number;
  private arc: any;  
  private pie: any;  
  private slices: any;
  private color: any;
  private svg: any;  
  private mainContainer: any;

  constructor(private http:HttpClient) {
    
  }

  ngOnInit() {
    this.http.get<Task[]>('http://localhost:8080/api/tasks').subscribe(r => {
      this.tasks = r;

    this.svg = d3.select('#chart').select('svg');
    this.setSVGDimensions();
    this.color = d3.scaleOrdinal(d3.schemeCategory10);
    this.mainContainer = this.svg.append('g').attr('transform', 'translate(' + this.radius + ',' + this.radius + ')');
    this.pie = d3.pie().sort(null).value((d: any) => d.id);
    this.draw();
  });
    
  }

  private setSVGDimensions() {
    this.radius = (Math.min(this.width, this.height)) / 2;
    this.svg.attr('width', 2 * this.radius).attr('height', 2 * this.radius);
    this.svg.select('g').attr('transform', 'translate(' + this.radius + ',' + this.radius + ')');
  }

  private draw() {
    this.setArcs();
    this.drawSlices();
  }

  private setArcs() {
    this.arc = d3.arc().outerRadius(this.radius).innerRadius(this.radius * .75);
  }

  private drawSlices() {
    this.slices = this.mainContainer.selectAll('path')
      .remove().exit()
      .data(this.pie(this.tasks))
      .enter().append('g').append('path')
      .attr('d', this.arc);
    this.slices
      .attr('fill', (d, i) => this.color(i));
  }
  

}
