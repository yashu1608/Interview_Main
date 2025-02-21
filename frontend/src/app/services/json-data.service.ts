import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonDataService {
  private apiURL = "https://localhost:7299/api/Json";

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(`${this.apiURL}/get-data`);
  }
  
  updateData(data: any): Observable<any> {
    return this.http.post(`${this.apiURL}/update-data`, data)
  }
}
