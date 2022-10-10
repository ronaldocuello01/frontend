import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private URI = 'http://localhost:4000/api/employees';

  constructor(public http: HttpClient) { }

  getEmployees (){
    return this.http.get<any>(`${this.URI}/`);
  }
  
  createEmployee (employee: any){
    return this.http.post<any>(`${this.URI}/`, employee);
  }

  updateEmployee(employee: any){
    return this.http.put<any>(`${this.URI}/${employee.id}`, employee);
  }

  deleteEmployee(id_employee: number){
    return this.http.delete<any>(`${this.URI}/${id_employee}`);
  }

}
