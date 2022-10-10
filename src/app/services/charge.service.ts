import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChargeService {

  private URI = 'http://localhost:4000/api/charges';

  constructor(public http: HttpClient) { }

  getCharges (){
    return this.http.get<any>(`${this.URI}/`);
  }

}
