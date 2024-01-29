import { Component, Input, OnInit } from '@angular/core';
import { DataPoint } from 'src/app/core/models/dataPoint';

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  @Input() title!: string;
  @Input() subTitle!: string;
  @Input() dataPoints!: DataPoint[];
  chartOptions: any;

  ngOnInit(): void {
    this.chartOptions = {
      animationEnabled: true,
      theme: "light2",
      exportEnabled: false,
      title: {
      text: `${this.title}`
      },
      subtitles: [{
      text: `${this.subTitle}`
      }],
      data: [{
      type: "pie", //change type to column, line, area, doughnut, etc
      indexLabel: "{name}: {y}%",
      dataPoints: this.dataPoints,
      }]
    }
  }
}
