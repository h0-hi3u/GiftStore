import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  @Input() type!: string;
  chartOptions: any;

  ngOnInit(): void {
    this.chartOptions = {
      animationEnabled: true,
      theme: "light2",
      exportEnabled: false,
      title: {
      text: "Order traffic"
      },
      subtitles: [{
      text: "in month"
      }],
      data: [{
      type: `${this.type}`, //change type to column, line, area, doughnut, etc
      indexLabel: "{name}: {y}%",
      dataPoints: [
        // { name: "Overhead", y: 9.1 },
        { name: "Problem Solving", y: 3.7 },
        { name: "Debugging", y: 36.4 },
        { name: "Writing Code", y: 30.7 },
        { name: "Firefighting", y: 29.2 }
      ]
      }]
    }
  }
}
