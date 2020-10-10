import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSortModule } from '@angular/material/sort';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/nav/header/header.component';
import { CharacterOverviewComponent } from './components/characters/character-overview/character-overview.component';
import { QuestionOverviewComponent } from './components/admin/questions/question-overview/question-overview.component';
import { AppRoutingModule } from './routes/app-routing.module';
import { InfoComponent } from './components/shared/info/info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpHeadersInterceptor } from './interceptors/http-headers.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { GenericTextPopupComponent } from './components/shared/generic-text-popup/generic-text-popup.component';
import { ToastrModule } from 'ngx-toastr';
import { AddCharacterComponent } from './components/characters/add-character/add-character.component';
import { WarningPopupComponent } from './components/shared/warning-popup/warning-popup.component';
import { SingleQuestionComponent } from './components/admin/questions/single-question/single-question.component';
import { AddEditQuestionComponent } from './components/admin/questions/add-edit-question/add-edit-question.component';
import { AddEditCategoryComponent } from './components/admin/questions/add-edit-category/add-edit-category.component';
import { UserOverviewComponent } from './components/admin/user-overview/user-overview.component';
import { AddAnswersComponent } from './components/characters/add-answers/add-answers.component';
import { SubmitAnswerComponent } from './components/characters/submit-answer/submit-answer.component';
import { LandingComponent } from './components/nav/landing/landing.component';
import { LoginComponent } from './components/account/login/login.component';
import { RegisterComponent } from './components/account/register/register.component';
import { CharacterAdminOverviewComponent } from './components/admin/character-admin-overview/character-admin-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CharacterOverviewComponent,
    QuestionOverviewComponent,
    LoginComponent,
    RegisterComponent,
    InfoComponent,
    GenericTextPopupComponent,
    AddCharacterComponent,
    WarningPopupComponent,
    SingleQuestionComponent,
    AddEditQuestionComponent,
    AddEditCategoryComponent,
    UserOverviewComponent,
    AddAnswersComponent,
    SubmitAnswerComponent,
    LandingComponent,
    CharacterAdminOverviewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    // Material CSS
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatTooltipModule,
    MatMenuModule,
    MatGridListModule,
    MatCardModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatTreeModule,
    MatDividerModule,
    MatTableModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatSortModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeadersInterceptor,
      multi: true,
    },
    CookieService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
