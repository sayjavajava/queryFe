import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'rolepermissions-component',
  templateUrl: '../../../templates/dashboard/setting/roles-permissions.template.html',
})
export class RolePermissionsComponent implements OnInit {

  constructor(private notificationservice:NotificationService) { }

  ngOnInit() {

  }

  public Success(){this.notificationservice.Success('succeeded','Done');}
  public Warn(){this.notificationservice.Warn('i am goging to die !')}
  public Error(){this.notificationservice.Error('errors are injurious to health ','try again')}
  public Clear(){this.notificationservice.Clear();}

}
