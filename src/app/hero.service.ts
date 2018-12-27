import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap} from 'rxjs/operators';
import { HEROES } from './mock-heroes';
import { Hero } from './hero';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl=`api/heroes`;
  private httpOptions = {
    headers : new HttpHeaders({ 'Content-type' : 'application/json' })
  };

  constructor(private messageService: MessageService,
    private http: HttpClient
  ) { }

  private log(msg: string) {
    this.messageService.add(`HeroService : ${msg}`);
  }

  private handleError<T> (operation = 'operation', result?: T){
      return (error: any):Observable<T> => {
        console.error(error);
        this.log(`${operation} failed: ${error.message}`);
        return of(result as T);
      }
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
          tap(_ => this.log('fetched heroes')),
          catchError(this.handleError(`getHeroes`, []))
      );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id = ${id}`))
    );
  }

  getTopHeroes(): Observable<Hero[]> {
    this.log(`fetched top heroes`);
    return of(HEROES.slice(0, 4));
  }

  updateHero(hero : Hero): Observable<any>{
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updateHero hero id=${hero.id}`)),
      catchError(this.handleError<Hero>(`updateHero`))
    );
  }

  addHero (hero: Hero):Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl, hero,this.httpOptions)
      .pipe(
        tap((hero: Hero) => this.log(`added hero w/ id = ${hero.id}`)),
        catchError(this.handleError<Hero>(`addHero`))
      );
  }

  deleteHero(hero: Hero | number): Observable<Hero>{
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted hero id = ${id}`)),
        catchError(this.handleError<Hero>(`deleteHero`))
      );
  }

  searchHero(term: string): Observable<Hero[]>{ 

    if(!term.trim()){
      return of([]);
    }

    const url = `${this.heroesUrl}?name=${term}`;

    return this.http.get<Hero[]>(url, this.httpOptions )
      .pipe(
        tap(_ => this.log(`found heroes matching ${term}`)),
        catchError(this.handleError<Hero[]>(`searchHero`, []))
      );

  }

}
