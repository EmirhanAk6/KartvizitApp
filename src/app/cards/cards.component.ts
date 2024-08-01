import { CardService } from './../services/card.service';
import { Component, OnInit,} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardModalComponent } from './card-modal/card-modal.component';



@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

    p:number = 1; 
    itemsPerPage:number = 4;
    totalCard:any;
  

  constructor(
    public dialog: MatDialog,
    public cardService: CardService,
    
  ) {
  }

  ngOnInit(): void {
    this.cardService.getCards();
  }
  

  openAddCardModal(): void{
    this.dialog.open(CardModalComponent, {
      width: '400px'
    });
  }

}
