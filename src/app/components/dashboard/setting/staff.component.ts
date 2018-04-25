import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'staff-component',
  templateUrl: '../../../templates/dashboard/setting/staff.template.html',
})
export class StaffComponent implements OnInit {
    roles: string[] = ['Doctor', 'Nurse', 'Receptionist','Cashier','SuperAdmin'];
    default: string = 'SuperAdmin';
    constructor() {
       }


    searchForm:FormGroup;
    ngOnInit() {
        this.searchForm = new FormGroup({
            role: new FormControl(null),
            name:new  FormControl(null),
            email:new FormControl(null)
        });
        this.searchForm.controls['role'].setValue(this.default, {onlySelf: true});

  }

}
