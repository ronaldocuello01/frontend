import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private url_specialities = 'http://localhost:4000/api/specialities';
  private url_types = 'http://localhost:4000/api/dishtypes';

  private url_files = 'http://localhost:4000/api/files';

  constructor(public http: HttpClient) { }

  getSpecialities(){
    return this.http.get<any>(`${this.url_specialities}/`);
  }

  getTypes(){
    return this.http.get<any>(`${this.url_types}/`);
  }

  addConcept(data: any){
    return this.http.post<any>(`${this.url_specialities}/`, data);
  }

  addDishType(data: any){
    return this.http.post<any>(`${this.url_types}/`, data);
  }

  uploadImages(data: any){
    return this.http.post<any>(`${this.url_files}/`, data);
  }


}
