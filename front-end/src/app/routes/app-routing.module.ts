import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { CharacterOverviewComponent } from '../components/characters/character-overview/character-overview.component';
import { QuestionOverviewComponent } from '../components/admin/question-overview/question-overview.component';
import { LoggedInGuard } from '../guards/logged-in.guard';
import { AdminGuard } from '../guards/admin.guard';
import { UserOverviewComponent } from '../components/admin/user-overview/user-overview.component';
import { AddAnswersComponent } from '../components/characters/add-answers/add-answers.component';

const routes: Routes = [
  { path: '', redirectTo: 'character-overview', pathMatch: 'full'},
  { path: 'character-overview', component: CharacterOverviewComponent },
  { path: 'answers/:charId', component: AddAnswersComponent },
  { path: 'question-overview', component: QuestionOverviewComponent, canActivate: [LoggedInGuard] },
  { path: 'user-overview', component: UserOverviewComponent, canActivate: [AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
