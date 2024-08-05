import { Card } from './../../models/card';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardModalComponent } from '../card-modal/card-modal.component';
import { CardService } from './../../services/card.service';
import { SnackbarService } from './../../services/snackbar.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import Swal, {} from 'sweetalert2'


@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
  
})
export class CardItemComponent implements OnInit {

  private deletedcard :any;
  @Input() card!: Card;
  showSpinner: boolean = false;
  cardForm!: FormGroup;
/*   isModalOpen = false; */

  constructor(
    
    private dialog: MatDialog,
    private cardService: CardService,
    private SnackbarService: SnackbarService,
    
  ) { }

  ngOnInit(): void {
  }

  openUpdateCardModal(card:Card): void {
    this.dialog.open(CardModalComponent, {
      width: '400px',
      data: card
    })
  }

  openModal(card: any): void {
    this.deletedcard = card;
    /* this.isModalOpen = true;  */
    Swal.fire({
      title: "Kartviziti kalıcı olarak silmek istiyor musunuz?",
      showDenyButton: true,
      denyButtonText: 'Hayır',
      confirmButtonText: "Evet",
      
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.confirmDelete();
      } else if (result.isDenied) {
        Swal.fire("Kartvizit Silinmedi", "", "info");
      }
    });
  }

/*   closeModal(): void {
    this.isModalOpen = false;
    
  } */

  confirmDelete(): void {
    this.showSpinner = true;
    this.cardService.deleteCard(this.deletedcard.id).subscribe(
      (res: any) => {
        this.getSuccessForDelete(/* res || 'Kartvizit başarıyla silindi.' */);
        this.cardService.getCards();
      },
      (err: any) => {
        this.getError(err.message || 'Kartvizit silinirken bir sorun oluştu');
      }
    );
    /* this.closeModal(); */
  }

/*   cancelDelete(): void {
    this.closeModal();
  }
 */


  getSuccessForDelete(/* message: string */): void {
    /* this.SnackbarService.createSnackbar('success', message); */
    Swal.fire({
      title: "Başarılı",
      text: "Kartvizit başarıyla silindi.",
      icon: "success"
    });
    this.cardService.getCards();
    this.showSpinner = false;
  }

  getError(message: string): void {
    this.SnackbarService.createSnackbar('error', message);
    this.showSpinner = false;
  }


}
