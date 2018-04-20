import {Routes} from '@angular/router';
import {DoctorComponent} from '../components/dashboard/setting/doctor.component';
import {ICDComponent} from '../components/dashboard/setting/icd.component';
import {DepartmentComponent} from '../components/dashboard/setting/department.component';
import {CashierComponent} from '../components/dashboard/setting/cashier.component';
import {MedicalServiceComponent} from '../components/dashboard/setting/medical-service.component';
import {NurseComponent} from '../components/dashboard/setting/nurse.component';
import {ReceptionistComponent} from '../components/dashboard/setting/receptionist.component';
import {BranchComponent} from '../components/dashboard/setting/branch.component';
import {RolePermissionsComponent} from '../components/dashboard/setting/role-permissions.component';
import {AddCashierComponent} from '../components/dashboard/setting/addcashier.component';
import {SettingComponent} from '../components/dashboard/setting/setting.component';
import {AdddoctorComponent} from '../components/dashboard/setting/adddoctor.component';
import {AddNurseComponent} from '../components/dashboard/setting/addnurse.component';
import {AddReceptionistComponent} from '../components/dashboard/setting/addreceptionist.component';
import {AddBranchComponent} from '../components/dashboard/setting/addbranch.component';


export const SettingRoutes: Routes = [
    // Setting Pages
    {path: '', redirectTo: 'branch', pathMatch: 'full'},
    {path: 'branch', component: BranchComponent},
    {path: 'branch/add', component: AddBranchComponent},
    {path: 'doctor', component: DoctorComponent},
    {path:'doctor/add',component: AdddoctorComponent},
    {path:'nurse',component:NurseComponent},
    {path:'nurse/add',component:AddNurseComponent},
    {path:'department',component:DepartmentComponent},
    {path:'cashier',component:CashierComponent},
    {path:'cashier/add',component: AddCashierComponent},
    {path: 'receptionist', component: ReceptionistComponent},
    {path: 'receptionist/add', component: AddReceptionistComponent},
    {path: 'icd', component: ICDComponent},
    {path:'medicalservices',component:MedicalServiceComponent},
    {path:'role-permissions',component:RolePermissionsComponent},
    {path: '**', redirectTo: '404'}
];
