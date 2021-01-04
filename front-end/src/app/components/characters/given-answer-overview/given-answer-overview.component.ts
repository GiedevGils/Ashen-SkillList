import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { Answer } from 'src/app/models/answer.model';
import { CharacterAnswer } from 'src/app/models/character-answer.model';
import { Character } from 'src/app/models/character.model';
import { QuestionCategory } from 'src/app/models/question-category.model';
import { Question } from 'src/app/models/question.model';
import { AnswerService } from 'src/app/services/answer.service';
import { CharacterService } from 'src/app/services/character.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-given-answer-overview',
  templateUrl: './given-answer-overview.component.html',
  styleUrls: ['./given-answer-overview.component.css']
})
export class GivenAnswerOverviewComponent implements OnInit {
  allAnswers: CharacterAnswer[] = [];
  displayedColumns = ['question', 'answer'];
  selectedCharacter: Character;
  allQuestions: QuestionCategory[];

  questionHolder: {
    category: QuestionCategory;
    answers: CharacterAnswer[];
  }[] = [];
  dataSource = new MatTableDataSource(this.questionHolder);

  constructor(
    private route: ActivatedRoute,
    private answerService: AnswerService,
    private questionService: QuestionService,
    private characterService: CharacterService
  ) {}

  ngOnInit() {
    const charId = +this.route.snapshot.paramMap.get('charId');

    const observables = {
      answers: this.answerService.getAnswersForCharacter(charId),
      characters: this.characterService.getCharacters(),
      questions: this.questionService.getAllQuestionsWithoutAnswers()
    };

    forkJoin(observables).subscribe({
      next: (value: { answers; questions; characters }) => {
        this.selectedCharacter = value.characters.find((x) => x.id === charId);
        this.format({
          categories: value.questions,
          selectedAnswers: value.answers
        });
        this.dataSource.data = this.questionHolder;
      }
    });
  }

  format({ categories, selectedAnswers }) {
    for (const cat of categories) {
      let displayItem: {
        category: QuestionCategory;
        answers: CharacterAnswer[];
      } = { answers: [], category: undefined };

      displayItem.category = cat;

      for (const c of displayItem.category.questions) {
        const question = selectedAnswers.find((x) => x.question.id === c.id);
        if (!question) {
          continue;
        }
        displayItem.answers.push(question);
      }

      if (displayItem.answers.length === 0) {
        continue;
      }

      this.questionHolder.push(displayItem);
    }
  }
}
