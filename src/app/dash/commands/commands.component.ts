import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommandData } from './command-model.model';
import { DashService } from '../dash.service';

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.css']
})
export class CommandsComponent {
  commands?: CommandData[];
  @Output() techClick: EventEmitter<string> = new EventEmitter<string>();
  @Input() techValue?: string;

  activeView: string = 'grid'

  techSelected: string | null = null;

  constructor(
    private dashSer: DashService,
  ){}

  ngOnInit(){
    this.dashSer.fetchCommands().subscribe(commands => {
      this.commands = commands;
      console.log(this.techValue);
    });

    this.dashSer.techSelected.subscribe(tech => {
      this.techSelected = tech;
      console.log(this.techSelected);
    });

    if(this.techSelected === undefined){
      this.dashSer.setTechSelected('Angular');
    }
  }

  filtrarComandosPorTech(tech: string): CommandData[] {
    return this.commands?.filter(command => command.command_tech === this.techSelected)!;
  }
}
