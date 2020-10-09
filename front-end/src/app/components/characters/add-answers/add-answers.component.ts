import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Answer } from 'src/app/models/answer.model';
import { Character } from 'src/app/models/character.model';
import { QuestionCategory } from 'src/app/models/question-category.model';
import { QuestionHolder } from 'src/app/models/question-holder.model';
import { Question } from 'src/app/models/question.model';
import { AnswerService } from 'src/app/services/answer.service';
import { CharacterService } from 'src/app/services/character.service';
import { QuestionService } from 'src/app/services/question.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-add-answers',
  templateUrl: './add-answers.component.html',
  styleUrls: ['./add-answers.component.css'],
})
export class AddAnswersComponent implements OnInit {
  character: Character;
  allQuestions: QuestionCategory[];
  questionsToAnswer: QuestionHolder[] = [];
  selectedQuestionIndex = 0;
  currentlySelectedQuestion: QuestionHolder;
  progress: number;
  canGoToPreviousQuestion = false;
  canGoToNextQuestion = true;
  displayEnd = false;

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private questionService: QuestionService,
    private answerService: AnswerService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    const charId = +this.route.snapshot.paramMap.get('charId');
    this.characterService.getCharacters().subscribe((res) => {
      this.character = res.find((x) => x.id === charId);
    });

    this.questionService.getAllQuestions().subscribe((res) => {
      this.allQuestions = res;
      res.forEach((cat) => {
        cat.questions.forEach((ques) => {
          const qh: QuestionHolder = {
            category: cat,
            question: ques,
            answers: ques.answers,
          };
          this.questionsToAnswer.push(qh);
        });
      });
      this.currentlySelectedQuestion = this.questionsToAnswer[
        this.selectedQuestionIndex
      ];
    });

    this.progress = 0;
  }

  nextQuestion() {
    this.canGoToPreviousQuestion = true;
    if (this.selectedQuestionIndex + 1 === this.questionsToAnswer.length) {
      this.canGoToNextQuestion = false;
    }
    this.selectedQuestionIndex++;
    this.currentlySelectedQuestion = this.questionsToAnswer[
      this.selectedQuestionIndex
    ];
    this.setProgress();
  }

  previousQuestion() {
    this.canGoToNextQuestion = true;
    if (this.selectedQuestionIndex - 1 === 0) {
      this.canGoToPreviousQuestion = false;
    }
    this.selectedQuestionIndex--;
    this.currentlySelectedQuestion = this.questionsToAnswer[
      this.selectedQuestionIndex
    ];
    this.setProgress();
  }

  saveAnswer(answer: Answer): void {
    const body = {
      questionId: this.currentlySelectedQuestion.question.id,
      answerId: answer.id,
      characterId: this.character.id,
    };

    this.answerService.submitAnswer(body).subscribe(
      (res) => {
        this.toast.toastSuccess('The answer was saved');
        this.nextQuestion();
      },
      (err) => {
        this.toast.toastError(
          `${err.status} - There was an error. Please let Ilthy know!`
        );
      }
    );
  }

  setProgress() {
    // 100 / the amount of questions gives a single percentage
    // Multiply that by the index of the question to get the progess
    this.progress =
      (100 / this.questionsToAnswer.length) * this.selectedQuestionIndex;
    if (this.progress === 100) {
      this.displayEnd = true;
    } else {
      this.displayEnd = false;
    }
  }
}
