import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { User } from 'src/app/models/user.model';
import { Character } from 'src/app/models/character.model';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-character-overview',
  templateUrl: './character-overview.component.html',
  styleUrls: ['./character-overview.component.css'],
})
export class CharacterOverviewComponent implements OnInit {
  userInfo: User;
  characters: Character[];

  constructor(private authService: AuthService, private toast: ToastService, private characterService: CharacterService) {}

  ngOnInit(): void {
    this.userInfo = this.authService.getUserInfoCookie();
    
    this.characterService.getCharacters().subscribe((res) => {
      this.characters = res;
    });
  }
}
