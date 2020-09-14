import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
  MatTreeNestedDataSource,
} from '@angular/material/tree';
import { ChildrenOutletContexts } from '@angular/router';
import { QuestionCategory } from 'src/app/models/question-category.model';
import { Question } from 'src/app/models/question.model';

interface QuestionNode {
  id: number;
  name: string;
  rating?: number;
  children?: QuestionNode[];
}

/** Flat node with expandable and level information */
interface FlatNode {
  expandable: boolean;
  name: string;
  rating: string;
  id: number;
  level: number;
}

@Component({
  selector: 'app-single-question',
  templateUrl: './single-question.component.html',
  styleUrls: ['./single-question.component.css'],
})
export class SingleQuestionComponent implements OnInit {
  @Input() questionCategory: QuestionCategory;

  private _transformer = (node: QuestionNode, level: number) => {
    let text: string;

    if (node.rating) {
      text = node.rating + ' - ' + node.name;
    } else {
      text = node.name;
    }

    return {
      expandable: !!node.children && node.children.length > 0,
      name: text,
      level,
    };
  };

  // tslint:disable-next-line: member-ordering
  treeControl = new FlatTreeControl<FlatNode>(
    (node) => {
      return node.level;
    },
    (node) => node.expandable
  );

  // tslint:disable-next-line: member-ordering
  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  // tslint:disable-next-line: member-ordering
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {}

  ngOnInit() {
    const data: QuestionNode[] = [];

    this.questionCategory.questions.forEach((question) => {
      question.answers.sort((x) => x.rating);

      const children: QuestionNode[] = [];
      question.answers.forEach((answer) => {
        children.push({
          id: answer.id,
          name: answer.description,
          rating: answer.rating,
        });
      });
      data.push({ id: question.id, name: question.description, children });
    });

    this.dataSource.data = data;
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;
}
