import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.css'],
})
export class UserOverviewComponent implements OnInit {
  users: User[];
  displayedColumns = ['id', 'name', 'code'];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserInfoBulk().subscribe((res) => {
      this.users = res;
    });
  }
}
