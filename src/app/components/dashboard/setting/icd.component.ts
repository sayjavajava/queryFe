import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'icd-component',
    templateUrl: '../../../templates/dashboard/setting/icd.template.html',
})
export class ICDComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
        document.title = 'HIS | Manage ICD';
    }

}
