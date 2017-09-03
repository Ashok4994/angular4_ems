import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from './request.service';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm;
  @ViewChild('update') updateForm: NgForm;
  employees: Employee[];
  addemp = false;
  editemp = false;
  checked = false;
  selectedEmployee: Employee;
  employee: Employee = {
    name:'',
    phone:'',
    address:'',
    salary:''
  };
  selected_id: string='';
  constructor(private empService: EmployeeService) {}

ngOnInit() {
   this.empService.getEmployees()
    .subscribe(employees => {
      this.employees = employees;
    });

}

onChecked(e , emp: Employee) {
  if (e.target.checked) {   
    console.log('Checkbox is checked');
    this.checked = true;
    this.selectedEmployee = emp;
  }
}
onAddEmp() {
  this.addemp = true;
}

onEmployeeEdit() {
  this.editemp = true; 
}

onEmpEdit(emp: Employee) {
  //this.selected_id = emp._id;
  this.editemp=true;
  console.log(emp);
   this.selectedEmployee = emp;
   console.log(this.selectedEmployee);
  //  this.selectedEmployee.name = emp.name;
  //  this.selectedEmployee.address = emp.address;
  //  this.selectedEmployee.phone = emp.phone;
  //  this.selectedEmployee.salary = emp.salary;
}

onSubmit() {
  console.log('In type script');
  this.employee.name = this.signupForm.value.username;
  console.log('In type script');
  this.employee.address = this.signupForm.value.address;
  console.log('In type script');
  this.employee.phone = this.signupForm.value.phn;
  this.employee.salary = this.signupForm.value.salary;
  this.signupForm.reset();
  this.empService.postEmployees(this.employee)
  .subscribe(
    data => {
      this.employees.push(data);
      
    },
    error => {
      console.log('Error Saving food');
     
    }
  );
  this.addemp = false;
}

onSubmitUpdate() {
  //this.employee._id = this.selected_id;

  // this.selectedEmployee.name = this.updateForm.value.username;
  // this.selectedEmployee.address = this.updateForm.value.address;
  // this.selectedEmployee.phone = this.updateForm.value.phn;
  // this.selectedEmployee.salary = this.updateForm.value.salary;
  console.log(this.selectedEmployee);

  this.empService.updateEmployee(this.selectedEmployee)
  .subscribe(
    data => {
      console.log(data);
      
    },
    error => {
      console.log('Error Saving employee');
     
    }
  );

  this.editemp = false; 
}

onDelete(emp: Employee) {
  this.employees.splice(this.employees.indexOf(this.selectedEmployee), 1);
  this.empService.deleteEmployee(emp)
  .subscribe(
    data => {
      console.log(data);
     
      
    },
    error => {
      console.log('Error Saving employee');
     
    }
  );
}
}
