import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DishesService {

  private URI = 'http://localhost:4000/api/dishes';

  constructor(public http: HttpClient) { }

  addDish(data: any){
    return this.http.post<any>(`${this.URI}/`, data);
  }

  getDishes(){
    return this.http.get<any>(`${this.URI}/`);
  }

  getBySpeciality(id: number){
    return this.http.get<any>(`${this.URI}/getBySpeciality/${id}`);
  }

  getByType(id: number){
    return this.http.get<any>(`${this.URI}/getByType/${id}`);    
  }

  filterData(data: any){
    return this.http.post<any>(`${this.URI}/filter`, data);
  }

}
