import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private employees: Employee[] = [];
  private employeeUpdated = new Subject<Employee[]>();

  constructor(
    private http: HttpClient,
    private router: Router) { }

  getOneEmployee(id: string, nameUri: string) {
    return this.http.get<{_id: string; name: string; password: string}>('http://localhost:3000' + nameUri + id);
  }
  getEmployees(nameUri: string) {
    this.http.get<{message: string; employees: any}>(
      'http://localhost:3000' + nameUri)
      .pipe(map(employeeData => {
        return employeeData.employees.map(employee => {
            return {
              id: employee._id,
              name: employee.name,
              password: employee.password
            };
        });
      }))
      .subscribe((transformedMeals) => {
        this.employees = transformedMeals;
        this.employeeUpdated.next([...this.employees]);
      });
  }

  getEmployeeUpdateListener() {
    return this.employeeUpdated.asObservable();
  }

  addEmployee(nameEmp: string, passwordEmp: string, nameUri: string) {
    const employee: Employee = {
      id: null,
      name: nameEmp,
      password: passwordEmp
    };
    this.http.post<{message: string, employeeId: string}>('http://localhost:3000' + nameUri, employee)
      .subscribe(responseData => {
          const id = responseData.employeeId;
          employee.id = id;
          this.employees.push(employee);
          this.employeeUpdated.next([...this.employees]);
      });
  }

  updateEmployee(id: string, name: string, password: string, nameUri: string) {
    const employee: Employee = { id, name, password };
    this.http
      .put('http://localhost:3000' + nameUri + id, employee)
      .subscribe(response => {
        const updatedEmployees = [...this.employees];
        this.employees = updatedEmployees;
        this.employeeUpdated.next([...this.employees]);
        this.router.navigate([nameUri]);
      });
  }

  deleteEmployee(employeeId: string, nameUri: string) {
    this.http
      .delete('http://localhost:3000' + nameUri + employeeId)
      .subscribe(() => {
        console.log('Deleted!');
        const updatedMeals = this.employees.filter(employee => employee.id !== employeeId);
        this.employees = updatedMeals;
        this.employeeUpdated.next([...this.employees]);
      });
  }




}
