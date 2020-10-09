import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Character } from 'src/app/models/character.model';
import { CharacterService } from 'src/app/services/character.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-add-character',
  templateUrl: './add-character.component.html',
  styleUrls: ['./add-character.component.css'],
})
export class AddCharacterComponent implements OnInit {
  isEdit: boolean;
  characterToEdit: Character;

  professions = [
    'Revenant',
    'Guardian',
    'Warrior',
    'Ranger',
    'Thief',
    'Engineer',
    'Elementalist',
    'Necromancer',
    'Mesmer',
  ].sort();

  squads = ['Lance', 'Blade'].sort();

  characterName = new FormControl('', [Validators.required]);
  squad = new FormControl('', [Validators.required]);
  profession = new FormControl('', [Validators.required]);

  characterForm = new FormGroup({
    characterName: this.characterName,
    squad: this.squad,
    profession: this.profession,
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { character: Character },
    private characterService: CharacterService,
    private toast: ToastService,
    private dialogRef: MatDialogRef<AddCharacterComponent>
  ) {}

  ngOnInit(): void {
    if (this.data?.character) {
      this.characterName = new FormControl(this.data.character.characterName, [
        Validators.required,
      ]);
      this.squad = new FormControl(this.data.character.squad, [
        Validators.required,
      ]);
      this.profession = new FormControl(this.data.character.profession, [
        Validators.required,
      ]);
      this.characterForm = new FormGroup({
        characterName: this.characterName,
        squad: this.squad,
        profession: this.profession,
      });
      this.isEdit = true;
      this.characterToEdit = this.data.character;
    }
  }

  addCharacter() {
    const name = this.characterForm.get('characterName').value;
    const squad = this.characterForm.get('squad').value;
    const profession = this.characterForm.get('profession').value;

    this.characterService.addCharacter(name, squad, profession).subscribe(
      (res) => {
        this.toast.toastSuccess(`${res.characterName} was created!`);
        this.dialogRef.close();
      },
      (err) => {
        this.toast.toastError(
          `${err.status} - Something went wrong creating your character! Please let Ilthy know!`
        );
        console.error(err);
      }
    );
  }

  editCharacter() {
    const name = this.characterForm.get('characterName').value;
    const squad = this.characterForm.get('squad').value;
    const profession = this.characterForm.get('profession').value;

    const charAsEdit: Character = {
      id: this.characterToEdit.id,
      characterName: name,
      squad,
      profession,
    };

    this.characterService.editCharacter(charAsEdit).subscribe(
      (res) => {
        this.toast.toastSuccess(`${res.characterName} has been updated`);
        this.dialogRef.close(charAsEdit);
      },
      (err) => {
        this.toast.toastError(
          `${err.status} - There was an error. Please let Ilthy know!`
        );
      }
    );
  }
}
