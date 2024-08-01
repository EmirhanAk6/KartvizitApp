import { Card } from 'src/app/models/card';
import { Inject, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  cards: Card[] = [];

  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private http:HttpClient
  ) { }

  getCards() : void {
   this.http.get<Card[]>(this.apiUrl + '/cards')
   .subscribe((res:Card[])=>{
      this.cards = res; 
   });
   
  }

  addCard(card:Card) : Observable<any>{
    return this.http.post(this.apiUrl+ '/cards', card );
  }

  updateCard(card:Card, cardID: number) : Observable<any>{
    return this.http.put(this.apiUrl+ '/cards/'+ cardID, card );
  }

  deleteCard(cardID : number) : Observable<any>{
    return this.http.delete(this.apiUrl + '/cards/' + cardID);
  }
}
