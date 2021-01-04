import { Injectable } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  // tslint:disable-next-line: variable-name
  private _shouldViewBeCompact: boolean;
  public viewChange: Subject<boolean> = new Subject<boolean>();

  get shouldViewBeCompact(): boolean {
    return this._shouldViewBeCompact;
  }
  set shouldViewBeCompact(shouldBe: boolean) {
    this._shouldViewBeCompact = shouldBe;
    this.viewChange.next(shouldBe);
  }
  resize = fromEvent(window, 'resize');

  constructor() {
    this.init(window.innerWidth);
  }

  init(size: number) {
    this.resize.subscribe((event: any) => {
      const width = event.target.innerWidth;
      if (width <= 1400) {
        this.shouldViewBeCompact = true;
      } else {
        this.shouldViewBeCompact = false;
      }
    });

    if (size <= 1400) {
      this.shouldViewBeCompact = true;
    }
  }
}
