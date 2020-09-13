import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-generic-text-popup',
  templateUrl: './generic-text-popup.component.html',
  styleUrls: ['./generic-text-popup.component.css'],
})
export class GenericTextPopupComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {title: string, text: string}) {}

  ngOnInit(): void {}
}
