import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Answer } from 'src/app/models/answer.model';
import { CharacterAnswer } from 'src/app/models/character-answer.model';
import { Character } from 'src/app/models/character.model';
import { QuestionCategory } from 'src/app/models/question-category.model';
import { QuestionHolder } from 'src/app/models/question-holder.model';
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
  // Question info
  character: Character;
  allQuestions: QuestionCategory[];
  questionsToAnswer: QuestionHolder[] = [];
  selectedQuestionIndex = 0;
  currentlySelectedQuestion: QuestionHolder;
  previouslyGivenAnswers: CharacterAnswer[] = [];
  answerForQuestion: Answer;

  // UI variables
  canGoToPreviousQuestion = false;
  canGoToNextQuestion = true;
  displayEnd = false;
  progress: number;

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

    this.questionService.getAllQuestions().subscribe(
      (res) => {
        this.allQuestions = res;
        this.questionsToAnswer = this.questionService.formatToQuestionHolder(
          res
        );
        this.currentlySelectedQuestion = this.questionsToAnswer[
          this.selectedQuestionIndex
        ];

        // Get the answers that the character has filled in previously.
        this.answerService.getAnswersForCharacter(charId).subscribe(
          (res2) => {
            this.previouslyGivenAnswers = res2;
            this.findAnswerInPreviouslyGivenAnswersForQuestion(
              this.currentlySelectedQuestion.question.id
            );
          },
          (err) => {
            throw err;
          }
        );
      },
      (err) => {
        this.toast.toastError(
          `${err.status} - There was an error. Please let Ilthy know!`
        );
      }
    );

    this.progress = 0;
  }

  /** Go to the next question */
  nextQuestion() {
    this.canGoToPreviousQuestion = true;
    // If the new index will be the same length as the amount of questions, the user cannot go to a next question anymore
    if (this.selectedQuestionIndex + 1 === this.questionsToAnswer.length) {
      this.canGoToNextQuestion = false;
    }

    // Increase the index
    this.selectedQuestionIndex++;

    // Set the new question
    this.currentlySelectedQuestion = this.questionsToAnswer[
      this.selectedQuestionIndex
    ];

    // set the progress bar
    this.setProgress();

    // Find the answers for the newly selected question
    this.findAnswerInPreviouslyGivenAnswersForQuestion(
      this.currentlySelectedQuestion?.question.id
    );
  }

  /** Go to previous question */
  previousQuestion() {
    // If the question goes one back, it can always go one ahead
    this.canGoToNextQuestion = true;

    // If the index is now at zero, it won't be able to go back anymore
    if (this.selectedQuestionIndex - 1 === 0) {
      this.canGoToPreviousQuestion = false;
    }

    // Go one index back
    this.selectedQuestionIndex--;

    // Select the new question
    this.currentlySelectedQuestion = this.questionsToAnswer[
      this.selectedQuestionIndex
    ];

    // Set the progress bar
    this.setProgress();

    // Find the answers for the newly selected question
    this.findAnswerInPreviouslyGivenAnswersForQuestion(
      this.currentlySelectedQuestion?.question.id
    );
  }

  /** Find a previously displayed answer. Does not do anything if hte user has finished answering */
  findAnswerInPreviouslyGivenAnswersForQuestion(questionId: number) {
    if (this.displayEnd) {
      return;
    }

    this.answerForQuestion = this.previouslyGivenAnswers.find(
      (x) => x.question.id === questionId
    )?.answer;
  }

  /** Save the answer */
  saveAnswer(answer: Answer): void {
    // Update the answer in the list so that it can correctly be displayed when the user navigates through the questions
    this.previouslyGivenAnswers.find((x) => x.question.id === this.currentlySelectedQuestion.question.id).answer = answer;
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

  /** Set the progress bar at the top of the page. If the  */
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