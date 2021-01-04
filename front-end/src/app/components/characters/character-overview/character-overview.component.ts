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
  amountOfColumns = 3;

  constructor(
    private authService: AuthService,
    private characterService: CharacterService,
    private dialog: MatDialog,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.setGridColumnNumber(null, window.innerWidth);

    this.authService.userInfoChange.subscribe((userInfo) => {
      this.userInfo = userInfo;
    });

    this.authService.getUserInfo().subscribe();

    // this.authService.loginChange.subscribe((_) => {
    //   this.getCharacters();
    // });

    this.getCharacters();
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
  setGridColumnNumber(event, width?: number) {
    let windowWidth: number;

    if (width && !event) {
      windowWidth = width;
    } else if (event && !width) {
      windowWidth = event.target.innerWidth || 800;
    } else {
      return;
    }

    if (windowWidth <= 1100) {
      this.amountOfColumns = 1;
    } else if (windowWidth <= 1700) {
      this.amountOfColumns = 2;
    } else {
      this.amountOfColumns = 3;
    }
  }

  openEdit(character: Character) {
    const dialogRef = this.dialog.open(AddCharacterComponent, {
      data: { character },
    });

    dialogRef.afterClosed().subscribe((char: Character) => {
      if (!char) {
        return;
      }
      const index = this.characters.indexOf(character);
      this.characters[index] = char;
    });
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
              `${err.status} - Something went wrong. Please let Ilthy know!`
            );
            console.error(err);
          }
        );
      }
    });
  }
}
