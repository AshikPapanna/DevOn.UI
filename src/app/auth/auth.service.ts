import { HttpBackend, HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of, throwError } from 'rxjs'
import { environment } from 'src/environments/environment'
import { ApiKey } from './models/api-key'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _apiKey!: ApiKey;
  //private httpClient!:HttpClient;
  constructor(private httpClient: HttpClient
    ) {
    //  this.httpClient=new HttpClient(http);
    }
  public Authenticate(apiKey: string):Observable<any> {
    return this.httpClient
      .post(environment.apiPath + 'auth/authenticate?key='+apiKey, { key: apiKey },{headers:{
        "Content-Type":"application/x-www-form-urlencoded"
      }});
      
  }
  get ApiKey() {
    return this._apiKey
  }
  set ApiKey(key) {
    this._apiKey=key;
  }
}
