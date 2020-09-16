import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CharacterService } from 'src/app/services/character.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-add-character',
  templateUrl: './add-character.component.html',
  styleUrls: ['./add-character.component.css'],
})
export class AddCharacterComponent implements OnInit {
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
    private characterService: CharacterService,
    private toast: ToastService,
    private dialogRef: MatDialogRef<AddCharacterComponent>
  ) {}

  ngOnInit(): void {}

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
}
