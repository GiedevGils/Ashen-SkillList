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
      text: 'Find character for skill',
      link: '/admin-character-overview',
      isAdminLink: true,
      icon: 'person_search',
    },
    {
      text: 'View users',
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
