import { Component } from '@angular/core';
import { JsonDataService } from '../../services/json-data.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SummaryUpdateComponent } from '../summary-update/summary-update.component';

@Component({
  selector: 'app-summary-viewed',
  imports:[CommonModule, SummaryUpdateComponent],
  templateUrl: './summary-viewed.component.html',
  styleUrl: './summary-viewed.component.scss'
})
export class SummaryViewedComponent {
  data: any = [];
  editingItem: any = null;

  constructor(private jsonService: JsonDataService) {}

  ngOnInit(): void {
    this.jsonService.getData().subscribe(response => {
      this.data = response.Datas;
    });
  }

  getPropertyValue(item: any, label: string): any {
    const property = item.Properties.find((prop: any) => prop.Label === label);
    return property ? property.Value : '';
  }

  editItem(item: any): void {
    this.editingItem = {
      SamplingTime: item.SamplingTime,
      ProjectName: this.getPropertyValue(item, 'Project Name'),
      ConstructionCount: this.getPropertyValue(item, 'Construction Count'),
      IsConstructionCompleted: this.getPropertyValue(item, 'Is Construction Completed'),
      LengthOfRoad: this.getPropertyValue(item, 'Length of the road')
    };
  }
}
