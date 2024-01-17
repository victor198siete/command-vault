import { Component, ElementRef, EventEmitter, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommandTech, CommandTechData } from '../tech-model.model';
import { DashService } from '../dash.service';
import { CommandData } from '../commands/command-model.model';

@Component({
  selector: 'app-dash-panel',
  templateUrl: './dash-panel.component.html',
  styleUrls: ['./dash-panel.component.css']
})
export class DashPanelComponent {
  @ViewChild('newCommand', { static: true }) commandForm?: NgForm;
  @ViewChild('newTech', { static: true }) techForm?: NgForm;

  @Input() techClick: EventEmitter<string> = new EventEmitter<string>();
  techValue?: string;

  commandTechValue?: CommandTech;
  techsList?: CommandTechData[];

  techSelected: string | null = null;

  techs: CommandTech[] = [
    {tech_id: 1, tech_name: "Angular"},
    {tech_id: 2, tech_name: "Docker"},
    {tech_id: 3, tech_name: "JS"},
    {tech_id: 4, tech_name: "React"},
    {tech_id: 5, tech_name: "Node JS"},
    {tech_id: 6, tech_name: 'Nest JS'},
    {tech_id: 4, tech_name: "Ionic"},
    {tech_id: 5, tech_name: "Git"},
  ];

  constructor(
    private dashSer: DashService,
    private el: ElementRef
  ){}

  ngOnInit(): void {
    this.dashSer.fetchTechs().subscribe(techs => {
      console.log(techs);
      this.techsList = techs;
    })

    this.dashSer.techSelected.subscribe(tech => {
      this.techSelected = tech;
      console.log(this.techSelected);
    });
  }

  onAddCommand(){
    if(!this.commandForm?.valid) {
      return
    }

    const newCommand = new CommandData ();
    newCommand.command_tech = this.commandForm.value['command-tech'];
    newCommand.command_text = this.commandForm.value['command-text'];
    newCommand.command_description = this.commandForm.value['command-des'];

    this.dashSer.addCommand(
      newCommand.command_tech!,
      newCommand.command_text!,
      newCommand.command_description!);

    this.commandForm.resetForm();
    this.closeModal('command');
  }

    onAddTech(){
    if(!this.techForm?.valid) {
      return
    }

    const newTech = new CommandTechData ();
    newTech.tech_name = this.techForm.value['tech-name'];
    newTech.tech_image = this.techForm.value['tech-image'];
    newTech.tech_description = this.techForm.value['tech-des'];

    this.dashSer.addTech(
      newTech.tech_name!,
      newTech.tech_image!,
      newTech.tech_description!);

    this.techForm.resetForm();
    this.closeModal('tech');
  }

  closeModal(id: string) {
    let argumento: string = '';
    if(id === 'command'){
      argumento = 'newCommandModal';
    } else {
      argumento = 'newTechModal';
    }
    const modal = this.el.nativeElement.querySelector(argumento);
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';

      // Si utilizas Bootstrap, también puedes eliminar el fondo oscuro detrás del modal
      const modalBackdrop = document.querySelector('.modal-backdrop');
      if (modalBackdrop) {
        modalBackdrop.remove();
      }
    }
  }

  handleCommandTech(ev: any){
    this.commandTechValue = ev;
    console.log(this.commandTechValue);
  }

  emitTechValue(tech: string): void {
    console.log(`Valor emitido: ${tech}`);
    this.techValue = tech;
  }
}
