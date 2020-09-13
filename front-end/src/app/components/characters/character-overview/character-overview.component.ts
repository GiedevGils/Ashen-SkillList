import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { User } from 'src/app/models/user.model';
import { Character } from 'src/app/models/character.model';
import { CharacterService } from 'src/app/services/character.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCharacterComponent } from '../add-character/add-character.component';
import { WarningPopupComponent } from '../../shared/warning-popup/warning-popup.component';

@Component({
  selector: 'app-character-overview',
  templateUrl: './character-overview.component.html',
  styleUrls: ['./character-overview.component.css'],
})
export class CharacterOverviewComponent implements OnInit {
  userInfo: User;
  characters: Character[];
  isLoggedIn: boolean;
  breakpoint = 3;

  constructor(
    private authService: AuthService,
    private characterService: CharacterService,
    private dialog: MatDialog,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.breakpoint = window.innerWidth <= 400 ? 1 : 3;

    this.getCharacters();
    this.authService.userInfoChange.subscribe((userInfo) => {
      this.userInfo = userInfo;
    });

    this.authService.loginChange.subscribe((_) => {
      this.getCharacters();
    });
  }

  getCharacters() {
    this.characterService.getCharacters().subscribe((res) => {
      this.characters = res;
    });
  }

  openCreateCharacterPopup() {
    const dialogRef = this.dialog.open(AddCharacterComponent);
    dialogRef.afterClosed().subscribe((_) => {
      this.getCharacters();
    });
  }

  // Used for proper scaling of the grid list
  onResize(event) {
    this.breakpoint = event.target.innerWidth <= 400 ? 1 : 3;
  }

  deleteCharacter(charId: number) {
    const dialogRef = this.dialog.open(WarningPopupComponent, {
      data: {
        title: 'Are you sure?',
        text:
          'This will delete all your character information, including the answers that you have submitted for this character.<br/><b>This is not reversible.</b>',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.characterService.deleteCharacter(charId).subscribe(
          (_) => {
            this.toast.toastSuccess('The character was deleted.');
            this.getCharacters();
          },
          (err) => {
            this.toast.toastError(
              'The delete was not successful. Please let Ilthy know!'
            );
            console.error(err);
          }
        );
      }
    });
  }
}
