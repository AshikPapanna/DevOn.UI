import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient:HttpClient) { }

  public getAllProducts(){
     return this.httpClient.get(environment.apiPath+'product');
  }
  public createProduct(pro:Product){
      return this.httpClient.post(environment.apiPath+'product',pro);
  }
  public deleteProduct(id:number){
    return this.httpClient.delete(environment.apiPath+'product/'+id);
  }
  public getProductById( id:any){
    return this.httpClient.get(environment.apiPath+'product/'+id);
}
  public getAllCategory(){
    return this.httpClient.get(environment.apiPath+'category');
}
public updateProduct(product:any){
  return this.httpClient.post(environment.apiPath+'product/edit',product);
}

}

// categoryID
// : 
// "2"
// description
// : 
// "asfsa"
// name
// : 
// "sfd"
// quantity
// : 
// "4"
