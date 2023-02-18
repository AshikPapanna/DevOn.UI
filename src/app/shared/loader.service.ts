import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loaderList: any[]=[];
  loaderSubject = new BehaviorSubject<any[]>([])
  constructor() { }

  public addLoader(key: string | undefined) {
    if (key) {
      this.loaderList.push(key)
      this.loaderSubject.next(this.loaderList)
    }
  }

  public removeLoader(key: string | undefined) {
    if (key) {
      let index = this.loaderList.indexOf(key)
      this.loaderList.splice(index, 1)
      this.loaderSubject.next(this.loaderList)
    }
  }
}
