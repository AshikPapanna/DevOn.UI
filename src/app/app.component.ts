import { Component, OnInit } from '@angular/core';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { LoaderService } from './shared/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  showLoader=false;
  loaderSub:any;
  constructor(private loaderService:LoaderService){

  }
  ngOnInit(): void {
    this.loaderSub=this.loaderService.loaderSubject.subscribe(x=>{
      if(x.length){
       setTimeout(() => {
        this.showLoader=true;
       }, 1);  
      }
      else{
        setTimeout(() => {
          this.showLoader=false;
         }, 2);  
      }
    })
  }
  title = 'DevOn.UI';
}
