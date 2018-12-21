import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb(){
      const heroes =[
        {id : 11, name : 'Mr. Nice'},
        {id : 12, name : 'Mr. Bad'},
        {id : 13, name : 'Mr. Good'},
        {id : 14, name : 'Mr. Best'},
        {id : 15, name : 'Mr. Better'},
        {id : 16, name : 'Mr. Lucky'},
        {id : 17, name : 'Mr. Worst'},
        {id : 18, name : 'Mr. Handsome'},
        {id : 19, name : 'Mr. Killer'},
        {id : 20, name : 'Mr. Robost'}
       ];  
    return {heroes};
  }

  genId(heroes:Hero[]): number{
      return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) +1 :11;
  }
  
}
