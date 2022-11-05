import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiMovie, ApiSerie } from 'src/interfaces/interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() currentMovie: ApiMovie | ApiSerie | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ApiMovie | ApiSerie,
    public dialogRef: MatDialogRef<ModalComponent>
  ) {
    this.currentMovie = data;
  }

}
