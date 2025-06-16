import { Component } from '@angular/core';
import { Sample } from '../../../data/sample';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-analytics',
  imports: [CommonModule, FormsModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent {
  data: string = ""
  datalist = Sample;

  handleSubmit(){
    console.log(this.data);
    
    Sample.push(this.data)
  }
}
