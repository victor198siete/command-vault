import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable , throwError } from 'rxjs';
import { take, tap, switchMap, catchError, map } from 'rxjs/operators';

import { Command, CommandData } from './commands/command-model.model';
import { CommandTech, CommandTechData  } from './tech-model.model';

@Injectable({
  providedIn: 'root'
})
export class DashService {

  private _techSelected = new BehaviorSubject<string | null>(null);

  get techSelected(): Observable<string | null> {
    return this._techSelected.asObservable();
  }

  setTechSelected(tech: string | null) {
    this._techSelected.next(tech);
  }

  private _commands = new BehaviorSubject<Command[]>([]);
  private _techs = new BehaviorSubject<CommandTechData[]>([]);

  get command(){
    return this._commands.asObservable();
  }

  get techs(){
    return this._techs.asObservable();
  }

  apiUrl: string = 'https://command-vault-default-rtdb.firebaseio.com/';

  get commands(){
    return this._commands;
  }

  constructor(
    private http: HttpClient
  ) { }

  addCommand(tech: string, command: string, description: string){
    const newCommand = new CommandData(tech, command, description)
    console.log(newCommand);
    return this.http
      .post(
        `${this.apiUrl}/commands.json`,
        newCommand
      ).subscribe(res => {
        console.log("Agregando Commando!");
        console.log(res);
        console.log(this.commands);
        // this.commands.push(newCommand);
      })
  }

  addTech(name: string, image: string, description: string){
    const newTech = new CommandTechData(name, image, description)
    console.log(newTech);
    return this.http
      .post(
        `${this.apiUrl}/techs.json`,
        newTech
      ).subscribe(res => {
        console.log("Agregando Commando!");
        console.log(res);
        console.log(this.techs);
        // this.commands.push(newCommand);
      })
  }

fetchCommands(){
  console.log('Fetching Commands!');
  return this.http
    .get<CommandData>(
      `${this.apiUrl}/commands.json`
    )
    .pipe(
      map((res:any) => {
        const commands = [];
        for (const key in res){
          if(res.hasOwnProperty(key)){
            commands.push(new CommandData(res[key].command_tech, res[key].command_text, res[key].command_description))
          }
        }
        return commands;
      }),
      tap(commands => {
        this._commands.next(commands);
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(()=>error);
      })
    );
  }

  fetchTechs(){
    console.log('Fetching Techs!');
    return this.http.get<CommandTechData>(
        `${this.apiUrl}/techs.json`
      )
      .pipe(
        map((res:any) => {
          const techs = [];
          for (const key in res){
            if(res.hasOwnProperty(key)){
              techs.push(new CommandTechData(res[key].tech_name, res[key].tech_image, res[key].tech_description))
            }
          }
          return techs;
        }),
        tap(techs => {
          this._techs.next(techs);
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(()=>error);
        })
      );
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
