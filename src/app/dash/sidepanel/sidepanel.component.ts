import { Component, ElementRef, EventEmitter, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { DashService } from '../dash.service';
import { CommandData } from '../commands/command-model.model';
import { CommandTech, CommandTechData } from '../tech-model.model';

@Component({
  selector: 'app-sidepanel',
  templateUrl: './sidepanel.component.html',
  styleUrls: ['./sidepanel.component.css']
})
export class SidepanelComponent {
  @ViewChild('newCommand', { static: true }) commandForm?: NgForm;
  @ViewChild('newTech', { static: true }) techForm?: NgForm;
  @Input() techClick: EventEmitter<string> = new EventEmitter<string>();

  techSelected: string | null = null;

  techValue?: string;

  commandTechValue?: CommandTech;

  techs: CommandTechData[] = [
    {
      tech_name: "Angular",
      tech_image: '../../../assets/images/logos/angular.svg',
      tech_description: 'Angular is an application-design framework and development platform for creating efficient and sophisticated single-page apps.'
    },
    {
      tech_name: "Docker",
      tech_image: '../../../assets/images/logos/docker.svg',
      tech_description: 'Docker is an open platform for developing, shipping, and running applications.'
    },
    {
      tech_name: "JS",
      tech_image: '../../../assets/images/logos/js.svg',
      tech_description: 'JavaScript (JS) is a lightweight interpreted (or just-in-time compiled) programming language with first-class functions.'
    },
    {
      tech_name: "React",
      tech_image: '../../../assets/images/logos/react.svg',
      tech_description: 'React is the library for web and native user interfaces.'
    },
    {
      tech_name: "Node JS",
      tech_image: '../../../assets/images/logos/node.svg',
      tech_description: 'Node.js is an open-source, cross-platform JavaScript runtime environment.'
    },
    {
      tech_name: "Npm",
      tech_image: '../../../assets/images/logos/npm.svg',
      tech_description: 'Npm is a library and registry for JavaScript software packages. npm also has command-line tools to help you install the different packages and manage their dependencies.'
    },
    {
      tech_name: "Ionic",
      tech_image: '../../../assets/images/logos/ionic.svg',
      tech_description: 'Ionic is an open source UI toolkit for building performant, high-quality mobile apps using web technologies.'
    },
    {
      tech_name: "Git",
      tech_image: '../../../assets/images/logos/git.svg',
      tech_description: 'Ionic is an open source UI toolkit for building performant, high-quality mobile apps using web technologies.'
    },
  ];

  constructor(
    private dashSer: DashService,
    private el: ElementRef
  ){}

  ngOnInit() {
    this.dashSer.techSelected.subscribe(tech => {
      this.techSelected = tech;
      console.log(this.techSelected);
    });

    if(this.techSelected === undefined){
      this.emitTechValue('Angular');
    }
  }

  handleCommandTech(ev: any){
    this.commandTechValue = ev;
    console.log(this.commandTechValue);
  }

  emitTechValue(tech: string){
    console.log(`Valor emitido: ${tech}`);
    this.techValue = tech;
    this.dashSer.setTechSelected(this.techValue);
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

}
