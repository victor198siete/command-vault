import { Component } from '@angular/core';
import { CommandData } from '../command-model.model';
import { DashService } from '../../dash.service';

@Component({
  selector: 'app-command-item',
  templateUrl: './command-item.component.html',
  styleUrls: ['./command-item.component.css']
})
export class CommandItemComponent {
  commands?: CommandData[];

  constructor(
    private dashSer: DashService
  ){}
}
