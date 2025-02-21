import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonDataService } from '../../services/json-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary-update',
  imports: [FormsModule, CommonModule],
  templateUrl: './summary-update.component.html',
  styleUrl: './summary-update.component.scss'
})
export class SummaryUpdateComponent {
  @Input() selectedItem: any;
  @Output() close = new EventEmitter<void>();
  @Input() data: any[] = []; // Initialize as an empty array


  constructor(private jsonService: JsonDataService) {}
  
  saveItem(): void {
    const updateRequest = {
      SamplingTime: this.selectedItem.SamplingTime,
      Properties: [
        { Label: 'Project Name', Value: this.selectedItem.ProjectName },
        { Label: 'Construction Count', Value: this.selectedItem.ConstructionCount },
        { Label: 'Is Construction Completed', Value: this.selectedItem.IsConstructionCompleted },
        { Label: 'Length of the road', Value: this.selectedItem.LengthOfRoad }
      ]
    };


    this.jsonService.updateData(updateRequest).subscribe(() => {
      // alert('Data updated successfully!'); if needed to show this alert box then just uncomment this line
      this.close.emit();
      window.location.reload();
    });
  }

  cancle(){
    this.close.emit();
  }

  getPropertyValue(item: any, label: string): any {
    const property = item.Properties.find((prop: any) => prop.Label === label);
    return property ? property.Value : '';
  }

  selectSamplingTime(item: any): void {
    this.selectedItem = {
      SamplingTime: item.SamplingTime,
      ProjectName: this.getPropertyValue(item, 'Project Name'),
      ConstructionCount: this.getPropertyValue(item, 'Construction Count'),
      IsConstructionCompleted: this.getPropertyValue(item, 'Is Construction Completed'),
      LengthOfRoad: this.getPropertyValue(item, 'Length of the road')
    };
  }
  
}