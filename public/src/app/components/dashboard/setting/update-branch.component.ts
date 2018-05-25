import {Component, OnInit} from "@angular/core";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import {ActivatedRoute, Router} from "@angular/router";
import {RequestsService} from "../../../services/requests.service";
import {NotificationService} from "../../../services/notification.service";
import {AmazingTimePickerService} from "amazing-time-picker";
import {Branch} from "../../../model/Branch";
import {ExamRooms} from "../../../model/ExamRooms";
import {AppConstants} from "../../../utils/app.constants";


@Component({
    selector: 'update-branch-component',
    templateUrl: '../../../templates/dashboard/setting/update-branch.template.html',
})
export class UpdateBranchComponent implements OnInit {
    constructor(private route: ActivatedRoute,
                private router: Router,
                private requestService: RequestsService,
                private fb: FormBuilder,
                private notificationService: NotificationService,
                private amazingTimePickerService?: AmazingTimePickerService) {

        this.requestService.getRequest(AppConstants.USER_BY_ROLE + '?name=' + this.userSelected)
            .subscribe(
                (response: Response) => {
                    if (response['responseCode'] === 'USER_SUC_01') {
                        let data = response['responseData'];
                        let userNameData = data;
                        this.pDoctor = response['responseData'];
                        console.log(this.pDoctor);
                    }
                },
                (error: any) => {
                    this.error = error.error.error;
                })
    }

    private sub: any;
    id: number;
    examRooms: any = [];
    officeHoursStart: string;
    officeHoursEnd: string;
    userSelected: string = 'doctor';
    pDoctor: any = [];
    error: any;
    branchForm: FormGroup;
    billingForm: FormGroup;
    scheduleForm: FormGroup;
    branch: Branch;

    ngOnInit() {
        this.createBranchForm();
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
            console.log(this.id);
        });
        this.createBillingForm();
        this.createScheduleForm();
        this.patchData();
    }

    createBranchForm() {
        this.branchForm = this.fb.group({

            'branchName': [null, Validators.compose([Validators.required, Validators.minLength(4)])],
            'country': [null],
            'state': [null],
            'city': [null],
            'primaryDoctor': [null],
            'zipCode': [null],
            'address': [null],
            'officePhone': [null],
            'fax': [null],
            'formattedAddress': [null],
            'officeHoursStart': [null, Validators.required],
            'officeHoursEnd': [null, Validators.required],
            'noOfExamRooms': [null],
            'examRooms': this.fb.array([this.createExamRoom()]),
        })
    }

    createBillingForm() {
        this.billingForm = this.fb.group({
            'billingBranch': [null],
            'billingName': [null],
            'billingTaxID': [null],
        })
    }

    createScheduleForm() {
        this.scheduleForm = this.fb.group({
            'showBranchOnline': '',
            'allowOnlineSchedulingInBranch': '',
        })
    }


    createExamRoom(): FormGroup {
        return this.fb.group({
            'examName': '',
            'allowOnlineScheduling': '',
        });
    }


    public patchData() {
        if (this.id) {

            this.requestService.findById(AppConstants.FETCH_BRANCHES_BY_ID + this.id).subscribe(
                branch => {
                    //  this.id = user.id;
                    this.branchForm.patchValue({
                        branchName: branch.branchName,
                        officeHoursStart: branch.officeHoursStart,
                        officeHoursEnd: branch.officeHoursEnd,
                        noOfExamRooms: branch.noOfExamRooms,
                        state: branch.state,
                        city: branch.city,
                        primaryDoctor: branch.username,
                        fax: branch.fax,
                        formattedAddress: branch.formattedAddress,
                        country: branch.country,
                        address: branch.address,
                        zipCode: branch.zipCode,
                        officePhone: branch.officePhone,


                    });

                    this.billingForm.patchValue({
                        billingBranch: branch.billingBranch,
                        billingName: branch.billingName,
                        billingTaxID: branch.billingTaxID


                    });

                    this.scheduleForm.patchValue({
                            showBranchOnline: branch.showBranchOnline,
                            allowOnlineSchedulingInBranch: branch.allowOnlineSchedulingInBranch,
                        }
                    );
                    console.log(branch.zipCode);
                    this.branchForm.controls['zipCode'].patchValue(branch.zipCode);
                    this.addFields(branch.rooms);
                    this.branchForm.controls['examRooms'].patchValue(branch.examRooms);
                }, (error: any) => {
                    //console.log(error.json());
                    this.error = error.error.error_description;

                });
        }

    }

    addBranch(data: any, value: any) {
        if (this.branchForm.valid) {
            let branchObject = this.prepareSaveBranch();
            if (value === 'done') {

                this.requestService.putRequest(AppConstants.UPDATE_BRANCH + this.id, branchObject)
                    .subscribe(function (response) {
                        if (response['responseCode'] === 'BRANCH_UPDATE_SUC_01') {
                            this.notificationService.success(' Branch has been Updated Successfully');
                        }
                    }, function (error) {
                        this.error = error.error.error_description;
                        this.notificationService.error('ERROR', 'Branch is not updated ');
                    });

                console.log(this.branchForm.value);
            }
            else {
                console.log('i am else');
                this.validateAllFormFields(this.branchForm);
            }
        }
    }

    prepareSaveBranch(): Branch {
        const formModel = this.branchForm.value;
        const billingModel = this.billingForm.value;
        const scheduleModel = this.scheduleForm.value;

        const secretLairsDeepCopy: ExamRooms = formModel.examRooms.map(
            (examRooms: ExamRooms) => Object.assign({}, examRooms)
        );

        // return new `Hero` object containing a combination of original hero value(s)
        // and deep copies of changed form model values
        const saveBranchModel: Branch = {
            branchName: formModel.branchName,
            officeHoursStart: formModel.officeHoursStart,
            officeHoursEnd: formModel.officeHoursEnd,
            noOfExamRooms: formModel.noOfExamRooms,
            state: formModel.state,
            city: formModel.city,
            country: formModel.country,
            primaryDoctor: formModel.primaryDoctor,
            zipCode: formModel.zipCode,
            address: formModel.address,
            officePhone: formModel.officePhone,
            fax: formModel.fax,
            formattedAddress: formModel.formattedAddress,

            examRooms: secretLairsDeepCopy,

            billingBranch: billingModel.billingBranch,
            billingName: billingModel.billingName,
            billingTaxID: billingModel.billingTaxID,

            showBranchOnline: scheduleModel.showBranchOnline,
            allowOnlineSchedulingInBranch: scheduleModel.allowOnlineSchedulingInBranch

        };
        return saveBranchModel;
    }


    isFieldValid(field: string) {
        return !this.branchForm.get(field).valid && this.branchForm.get(field).touched;
    }

    displayFieldCss(field: string) {
        return {
            'has-error': this.isFieldValid(field),
            'has-feedback': this.isFieldValid(field)
        };
    }


    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            //console.log(field);
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({onlySelf: true});
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

    cancel() {
        this.router.navigate(['/dashboard/setting/staff']);
    }

    getOfficeHoursStart() {
        const amazingTimePicker = this.amazingTimePickerService.open();
        amazingTimePicker.afterClose().subscribe(time => {
            this.officeHoursStart = time;
            this.branchForm.controls['officeHoursStart'].setValue(time);

        })
    }

    getOfficeHoursEnd() {
        const amazingTimePicker = this.amazingTimePickerService.open();
        amazingTimePicker.afterClose().subscribe(time => {
            this.officeHoursEnd = time;
            this.branchForm.controls['officeHoursEnd'].setValue(time);

        })
    }

    getDoctor(value: any) {
        if (value) {
            this.branchForm.controls['primaryDoctor'].setValue(value);
        }
    }

    getCountry(value: any) {
        if (value) {
            this.branchForm.controls['country'].setValue(value);
        }
    }

    getState(value: any) {
        if (value) {
            this.branchForm.controls['country'].setValue(value);
        }
    }

    getBillingBranch(value: any) {
        if (value) {
            this.billingForm.controls['billingBranch'].setValue(value);
        }
    }

    getZipCode(value: any) {
        if (value) {
            this.branchForm.controls['zipCode'].setValue(value);
        }
    }

    getNoOfExamRooms(value: any) {
        if (value) {
            this.branchForm.controls['noOfExamRooms'].setValue(value);
            //  this.noOfExamRooms=value;
            this.addFields(value);
        }
    }

    addFields(no: number): void {
        this.examRooms = this.branchForm.get('examRooms') as FormArray;
        for (var i = 0; i < no; i++) {
            this.examRooms.push(this.createExamRoom());
        }

    }


}