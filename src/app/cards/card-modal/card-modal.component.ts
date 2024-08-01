import { SnackbarService } from './../../services/snackbar.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CardService } from './../../services/card.service';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Card } from 'src/app/models/card';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss'],
})
export class CardModalComponent implements OnInit {
  cardForm!: FormGroup;
  @Input() card!: Card;
  showSpinner: boolean = false;
  isModalOpen = false;
  private updatedcard: any;

  constructor(
    private dialogRef: MatDialogRef<CardModalComponent>,
    private fb: FormBuilder,
    private cardService: CardService,
    private _snackBar: MatSnackBar,
    private SnackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: Card
  ) {}

  ngOnInit(): void {
    this.cardForm = this.fb.group({
      name: [this.data?.name || '', Validators.maxLength(50)],
      title: [
        this.data?.title || '',
        [Validators.required, Validators.maxLength(255)],
      ],
      phone: [
        this.data?.phone || '',
        [
          Validators.required,
          Validators./* pattern */ maxLength(50 /* '^[0-9]{11}$' */),
        ],
      ],
      email: [
        this.data?.email || '',
        [Validators.maxLength(50), Validators.email],
      ],
      address: [this.data?.address || '', Validators.maxLength(255)],
    });
  }
  addCard(): void {
    this.showSpinner = true;
    console.log(this.cardForm.value);
    this.cardService.addCard(this.cardForm.value).subscribe(
      (res: any) => {
        this.getSuccessForAdd(/* res || 'Kartvizit başarıyla eklendi.' */);
      },
      (err: any) => {
        this.getError(err.message || 'Kartvizit eklenirken bir sorun oluştu ');
      }
    );
    /* this.closeModal(); */
  }

  openModal(card: any): void {
    /*     this.updatedcard = card;
    this.isModalOpen = true; */
    Swal.fire({
      title: 'Değişiklikleri kaydetmek istiyor musun?',
      showCancelButton: true,
      confirmButtonText: 'Save',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        /* Swal.fire("Saved!", "", "success"); */
        this.confirmUpdateCard();
      } /* else if (result.isDenied) {
        Swal.fire("Güncelleme yapılmadı", "", "info");
      } */
    });
  }

/*   closeModal(): void {
    this.isModalOpen = false;
  }
 */
  confirmUpdateCard(): void {
    this.showSpinner = true;
    this.cardService.updateCard(this.cardForm.value, this.data.id).subscribe(
      (res: any) => {
        this.getSuccessForUpdate(/* res || 'Kartvizit başarıyla güncellendi.' */);
        this.cardService.getCards();
      },
      (err: any) => {
        this.getError(
          err.message || 'Kartvizit güncellenirken bir sorun oluştu.'
        );
      }
    );
    this.dialogRef.close();
  }

/*   cancelUpdate(): void {
    this.closeModal();
  } */

  getSuccessForAdd(/* message: string */): void {
    Swal.fire({
      title: 'Başarılı',
      text: 'Kartvizit başarıyla eklendi.',
      icon: 'success',
    });
    this.cardService.getCards();
    this.showSpinner = false;
    this.dialogRef.close();
  }
  getSuccessForUpdate(/* message: string */): void {
    Swal.fire({
      title: 'Başarılı',
      text: 'Kartvizit başarıyla güncellendi.',
      icon: 'success',
    });
    this.cardService.getCards();
    this.showSpinner = false;
    this.dialogRef.close();
  }

  getError(message: string): void {
    this.SnackbarService.createSnackbar /* ('error', message) */;
    this.showSpinner = false;
    this.dialogRef.close();
  }
}
