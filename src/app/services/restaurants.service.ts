import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  private URI = 'http://localhost:4000/api/restaurants';

  constructor(public http: HttpClient) { }

  addRestaurant(data: any){
    return this.http.post<any>(`${this.URI}/`, data);
  }

  getRestaurants(){
    return this.http.get<any>(`${this.URI}/`);
  }

  getRestaurantsByConcept(id: number){
    return this.http.get<any>(`${this.URI}/getBySpeciality/${id}`);
  }

  addView(id: number){
    return this.http.get<any>(`${this.URI}/sumViews/${id}`);
  }

}
