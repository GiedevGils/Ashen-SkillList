import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor() {}

  private menuItems: MenuItem[] = [
    {
      text: 'List characters',
      link: '/character-overview',
      isAdminLink: false,
      icon: 'group',
    },
    {
      text: 'Manage questions',
      link: '/question-overview',
      isAdminLink: true,
      icon: 'question_answer',
    },
    {
      text: 'Manage characters',
      link: '',
      isAdminLink: true,
      icon: 'groups',
    },
    {
      text: 'Manage users',
      link: '/user-overview',
      isAdminLink: true,
      icon: 'people',
    },
  ];

  getMenu() {
    return this.menuItems;
  }
}

export class MenuItem {
  id?: number;
  text: string;
  link?: string;
  icon?: string;
  isAdminLink: boolean;
}
