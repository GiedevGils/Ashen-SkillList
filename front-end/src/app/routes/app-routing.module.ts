import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { CharacterOverviewComponent } from '../components/character-overview/character-overview.component';
import { QuestionOverviewComponent } from '../components/question-overview/question-overview.component';

const routes: Routes = [
  { path: 'character-overview', component: CharacterOverviewComponent },
  { path: 'question-overview', component: QuestionOverviewComponent },
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
