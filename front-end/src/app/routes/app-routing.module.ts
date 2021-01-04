import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { CharacterOverviewComponent } from '../components/characters/character-overview/character-overview.component';
import { QuestionOverviewComponent } from '../components/admin/questions/question-overview/question-overview.component';
import { LoggedInGuard } from '../guards/logged-in.guard';
import { AdminGuard } from '../guards/admin.guard';
import { UserOverviewComponent } from '../components/admin/user-overview/user-overview.component';
import { AddAnswersComponent } from '../components/characters/add-answers/add-answers.component';
import { LandingComponent } from '../components/nav/landing/landing.component';
import { CharacterAdminOverviewComponent } from '../components/admin/character-admin-overview/character-admin-overview.component';
import { GivenAnswerOverviewComponent } from '../components/characters/given-answer-overview/given-answer-overview.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'character-overview', component: CharacterOverviewComponent },
  { path: 'answer-overview/:charId', component: GivenAnswerOverviewComponent },
  { path: 'answers/:charId', component: AddAnswersComponent },
  {
    path: 'question-overview',
    component: QuestionOverviewComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'user-overview',
    component: UserOverviewComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin-character-overview',
    component: CharacterAdminOverviewComponent,
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
