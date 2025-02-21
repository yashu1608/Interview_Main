import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SummaryViewedComponent } from './components/summary-viewed/summary-viewed.component';

@Component({
  selector: 'app-root',
  imports:[SummaryViewedComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'interview_megaminds';
}
