import { DataPointColumn } from 'src/app/core/models/dataPointColumn';
import { DataPoint } from './../../../core/models/dataPoint';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.scss']
})
export class ColumnChartComponent implements OnInit{
  @Input() title!: string;
  @Input() dataPoint!: DataPointColumn[];
  chartOptions: any;
  ngOnInit(): void {
    this.chartOptions = {
      title:{
        text: `${this.title}`
      },
      animationEnabled: true,
      data: [{        
        type: "column",
        dataPoints: this.dataPoint
      }]
    }	
  }
  
}
