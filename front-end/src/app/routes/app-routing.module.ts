import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { CharacterOverviewComponent } from '../components/characters/character-overview/character-overview.component';
import { QuestionOverviewComponent } from '../components/admin/question-overview/question-overview.component';
import { LoggedInGuard } from '../guards/logged-in.guard';
import { AdminGuard } from '../guards/admin.guard';
import { UserOverviewComponent } from '../components/admin/user-overview/user-overview.component';

const routes: Routes = [
  { path: '', redirectTo: 'character-overview', pathMatch: 'full'},
  { path: 'character-overview', component: CharacterOverviewComponent },
  { path: 'question-overview', component: QuestionOverviewComponent, canActivate: [LoggedInGuard] },
  { path: 'user-overview', component: UserOverviewComponent, canActivate: [AdminGuard] },
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
