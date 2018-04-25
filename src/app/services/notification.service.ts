import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';

declare var toastr: any;

@Injectable()
export class NotificationService {

    public toastsubject: Subject<string> = new Subject();

    showduration: number = 5000;

    constructor() {
        this.Settings();
    }

    public Success(title: string, msg?: any) {
        toastr.success(title, msg);
    }

    public Error(title: string, msg?: any) {
        toastr.error(title, msg);
    }

    public Warn(title: string) {
        toastr.warning(title);
    }

    public Clear() {
        toastr.clear();
    }

    public Settings() {

        toastr.options = {
            'closeButton': true,
            'debug': false,
            'newestOnTop': true,
            'progressBar': true,
            'positionClass': 'toast-top-right',
            'preventDuplicates': false,
            'onclick': null,
            'showDuration': '300',
            'hideDuration': '1000',
            'timeOut': '5000',
            'extendedTimeOut': '1000',
            'showEasing': 'swing',
            'hideEasing': 'linear',
            'showMethod': 'fadeIn',
            'hideMethod': 'fadeOut'
        }
    }


}