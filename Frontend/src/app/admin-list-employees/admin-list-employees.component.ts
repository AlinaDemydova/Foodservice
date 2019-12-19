import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../services/employee.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import defaultConfig from '../../../config/default';

@Component({
  selector: 'app-admin-list-employees',
  templateUrl: './admin-list-employees.component.html',
  styleUrls: ['./admin-list-employees.component.scss']
})
export class AdminListEmployeesComponent implements OnInit {
  defConfig = defaultConfig;
  employees: Employee[] = [];
  employee: Employee;
  isNone: boolean;
  ngClass: any;
  private employeesSub: Subscription;
  private mode = 'create';
  employeeId: string;

  constructor(
    public employeeService: EmployeeService,
    public route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.employeeService.getEmployees(this.defConfig.adminEmployeesURI);

    this.employeesSub = this.employeeService.getEmployeeUpdateListener()
      .subscribe((employees: Employee[]) => {
        this.employees = employees;
      });

    const myId = this.route.snapshot.paramMap.get('id');

    this.employee = this.employees.find(emp => emp.id === myId);
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (myId) {
        this.isNone = false;
        this.mode = 'edit';
        this.employeeId = myId;
        this.employeeService.getOneEmployee(this.employeeId, this.defConfig.adminEmployeesURI).subscribe(employeeData => {
          this.employee = {id: employeeData._id, name: employeeData.name, password: employeeData.password};
        });
      } else {
        this.isNone = true;
        this.mode = 'create';
        this.employeeId = null;
      }
    });
  }

  createEmployeeForm() {
    this.isNone = false;
  }

  onSaveEmployee(form: NgForm) {
    if (form.invalid) { return; }
    if (this.mode === 'create') {
      this.employeeService.addEmployee(
        form.value.name,
        form.value.password,
        this.defConfig.adminEmployeesURI);
    } else {
      this.employeeService.updateEmployee(
        this.employeeId,
        form.value.name,
        form.value.password,
        this.defConfig.adminEmployeesURI);
    }

    form.resetForm();
    this.isNone = true;
  }

  onDelete(employeeId: string) {
    this.employeeService.deleteEmployee(employeeId, this.defConfig.adminEmployeesURI);
  }

}
