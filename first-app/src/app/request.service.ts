import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Employee } from './employee';
@Injectable()
export class EmployeeService {
    constructor(private http: Http) { }

        getEmployees() {
            return this.http.get('http://localhost:3000/employee')
            .map(res => res.json());
        }

        postEmployees(employee: any) {
            const headers = new Headers({'Content-Type': 'application/json'});
            const options = new RequestOptions({headers: headers});
            console.log(employee);
            const body = JSON.stringify(employee);
            console.log(employee);
            return this.http.post('http://localhost:3000/employee', 
                    body, options)
                .map(res => res.json());
        }


        updateEmployee(employee: Employee) {
            const headers = new Headers({'Content-Type': 'application/json'});
            const options = new RequestOptions({headers: headers});
            console.log('In service class');
            const id= employee._id;
            const body = JSON.stringify(employee);
            console.log(id);
            return this.http.put('http://localhost:3000/employee/'+id, 
                body, options)
                .map(res => res.json());

        }
        
        editEmployee(employee: Employee) {
            
        }
        deleteEmployee(emp: Employee) {
            const headers = new Headers({'Content-Type': 'application/json'});
            const options = new RequestOptions({headers: headers});
            const id = emp._id;
            return this.http.delete('http://localhost:3000/employee/'+id, options)
                    .map(res => res.json());
        }


    }
