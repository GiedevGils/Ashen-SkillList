import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuestionCategory } from 'src/app/models/question-category.model';
import { QuestionService } from 'src/app/services/question.service';
import { WarningPopupComponent } from '../../shared/warning-popup/warning-popup.component';

@Component({
  selector: 'app-question-overview',
  templateUrl: './question-overview.component.html',
  styleUrls: ['./question-overview.component.css'],
})
export class QuestionOverviewComponent implements OnInit {
  readyForTable: boolean;
  questionCategories: QuestionCategory[];
  displayedColumns = ['description', 'numberOfQuestions', 'adminButtons'];
  expandedElement: QuestionCategory | null;

  constructor(
    private questionService: QuestionService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.questionService.getAllQuestions().subscribe((res) => {
      this.questionCategories = res;
      this.readyForTable = true;
    });
  }

  deleteCharacter(catId: number) {
    const dialogRef = this.dialog.open(WarningPopupComponent, {
      data: {
        title: 'Are you sure?',
        text:
          'This will delete the category, all the questions in the category, and the answers to the questions.<br/><b>This is not reversible.</b>',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }
}
