import { Component, OnInit } from '@angular/core';
import { ChargeService } from "../../services/charge.service";
import { EmployeeService } from "../../services/employee.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  txt: string = ""
  editMode: boolean = false

  employees: any[] = [];
  charges: any[] = [];

  employee = {
    id: 0,
    name: '',
    idNumber: '',
    inDate: '',
    charge: 0
  }

  constructor(private employeeService: EmployeeService, private chageService: ChargeService) { }

  ngOnInit(): void {
    this.getEmployees();
    this.getCharges();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe(
      res => {
        this.employees = res;
      },
      err => console.error(err)
    );
  }

  getCharges() {
    this.chageService.getCharges().subscribe(
      res => {
        this.charges = res;
      },
      err => console.error(err)
    );
  }

  validEmployeeInfo() {
    let valid = true
    if (this.employee.name == '') {
      valid = false
    }

    if (this.employee.idNumber == '') {
      valid = false
    }

    if (this.employee.inDate == '') {
      valid = false
    }

    if (this.employee.charge == 0) {
      valid = false
    }

    return valid
  }

  saveNewEmployee() {
    if (this.validEmployeeInfo()) {
      this.employeeService.createEmployee(this.employee).subscribe(
        res => {
          Swal.fire(
            res.msg,
            '',
            'success'
          )
          this.clearEmployeeInfo()
          this.getEmployees()
        },
        err => console.error(err)
      )
    }else{
      Swal.fire(
        'Error',
        'Complete la Información!',
        'error'
      )
    }
  }

  beginEdit(obj: any) {
    this.employee.id = obj.id
    this.employee.name = obj.name
    this.employee.idNumber = obj.idnumber
    const date = new Date(obj.indate).toISOString().slice(0, 10);
    this.employee.inDate = date
    this.employee.charge = obj.charge
    this.editMode = true
  }

  cancelEdit() {
    this.clearEmployeeInfo()
  }

  saveEmployeeInfo() {
    if (this.validEmployeeInfo()) {
      this.employeeService.updateEmployee(this.employee).subscribe(
        res => {
          Swal.fire( res.msg, '', 'success' )
          this.clearEmployeeInfo()
          this.getEmployees()
        },
        err => console.error(err)
      )
    }else{
      Swal.fire(
        'Error',
        'Complete la Información!',
        'error'
      )
    }
  }

  clearEmployeeInfo() {
    this.employee.id = 0
    this.employee.name = ''
    this.employee.idNumber = ''
    this.employee.inDate = ''
    this.employee.charge = 0
    this.editMode = false
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(
      res => {
        Swal.fire( res.msg, '', 'success' )
        this.clearEmployeeInfo()
        this.getEmployees()
      },
      err => console.error(err)
    )
  }

  filter() {
    console.log(this.txt);
  }

}
