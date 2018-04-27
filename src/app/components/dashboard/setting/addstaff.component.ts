import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'addstaff-component',
    templateUrl: '../../../templates/dashboard/setting/addstaff.template.html',
})
export class AddStaffComponent implements OnInit {

    allowdiscount:boolean =true;
    department:boolean;
    checkUpInterval:boolean;
    dutytimmingshift1:boolean;
    dutytimmingshift2:boolean;
    vacation:boolean;
    vacationweek:boolean;
    services:boolean;
    dutywithdoctor:boolean;
    managepatientrecord:boolean;
    managepatientinvoices:boolean;

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    public goTo(value: any) {
        console.log('i am goto' + value)
        if (value) {

            this.checkPermission(value);
        }
    }

    checkPermission(user:string){
       this.changeState();
       switch(user) {
        case 'doctor':
            this.doctorPermissions();
            break;
        case 'nurse':
            this.nursePermissions();
             break;
        case 'receptionist':
            this.receptionistPermissions();
            break;
        case 'cashier':
            this.cashierPermissions();
            break;
           default:
               this.doctorPermissions();
    }
    }
private doctorPermissions(){
        this.checkUpInterval=true;
        this.department=true;
        this.dutytimmingshift1=true;
        this.dutytimmingshift2=true;
        this.vacation=true;
        this.vacationweek=true;
        this.services=true;


    }
    private nursePermissions(){

        this.department=true;
        this.managepatientinvoices=true;
        this.managepatientrecord=true;
        this.dutywithdoctor=true;

    }

    private receptionistPermissions(){
        this.allowdiscount=true;
    }
    private cashierPermissions(){
        this.allowdiscount=true;
    }
    private changeState(){
        this.allowdiscount =false;
        this.department=false;
        this.checkUpInterval=false;
        this.dutytimmingshift1=false;
        this.dutytimmingshift2=false;
        this.vacation=false;
        this.vacationweek=false;
        this.services=false;
        this.dutywithdoctor=false;
        this.managepatientrecord=false;
        this.managepatientinvoices=false;
    }

}
