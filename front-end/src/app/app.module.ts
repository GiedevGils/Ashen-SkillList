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

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/nav/header/header.component';
import { CharacterOverviewComponent } from './components/characters/character-overview/character-overview.component';
import { QuestionOverviewComponent } from './components/admin/question-overview/question-overview.component';
import { LoginComponent } from './components/account/login/login.component';
import { RegisterComponent } from './components/account/register/register.component';
import { AppRoutingModule } from './routes/app-routing.module';
import { InfoComponent } from './components/shared/info/info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpHeadersInterceptor } from './interceptors/http-headers.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { GenericTextPopupComponent } from './components/shared/generic-text-popup/generic-text-popup.component';
import { ToastrModule } from 'ngx-toastr';
import { AddCharacterComponent } from './components/characters/add-character/add-character.component';
import { WarningPopupComponent } from './components/shared/warning-popup/warning-popup.component';
import { SingleQuestionComponent } from './components/admin/single-question/single-question.component';
import { AddEditQuestionComponent } from './components/admin/add-edit-question/add-edit-question.component';
import { AddEditCategoryComponent } from './components/admin/add-edit-category/add-edit-category.component';
import { UserOverviewComponent } from './components/admin/user-overview/user-overview.component';

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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
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
    MatSlideToggleModule
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
