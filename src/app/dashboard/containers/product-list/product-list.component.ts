
import { DataSource } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, ReplaySubject } from 'rxjs';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { DashboardService } from '../../dashboard.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit,OnDestroy {
  allProductSub:any;
  delProdSub:any;
  allProducts:any;
  data:any;
  displayedColumns: string[] = ['productID', 'name', 'quantity', 'categoryName','created','actions'];
  constructor(private snackBar:MatSnackBar,private dashBoardService:DashboardService,public dialog: MatDialog) { }
  dataSource:any;
  ngOnDestroy(): void {
    if(this.allProductSub) this.allProductSub.unsubscribe();
    if(this.delProdSub) this.delProdSub.unsubscribe();
  }

  ngOnInit(): void { 
    this.allProductSub=this.dashBoardService.getAllProducts().subscribe(
      {
        next:(res:any)=>{
          console.log(res);
          this.data=res;
          this.dataSource=new ProductDataSource(this.data)
        }
      }
    )
  }
  deleteItem(ele:Product){
    const dialogRef = this.dialog.open(DialogComponent, {
      
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    
    });
    return;
    this.delProdSub=this.dashBoardService.deleteProduct(ele.productID!).subscribe(x=>{
      this.data=this.data.filter((x:Product)=>x.productID!==ele.productID);
      // let dataToDis=this.dataSource.filter((x:Product)=>x.productID!==ele.productID);
       this.dataSource.setData( this.data);
      this.snackBar.open("Deleted Successfully.","X",{
        horizontalPosition: 'center',
        verticalPosition:'top',
        duration: 2000,
       panelClass: ['red-bg']

       });
    });

  }

}
class ProductDataSource extends DataSource<Product>{
  private _dataStream = new ReplaySubject<Product[]>();
  constructor(data:Product[]){
    super();
    this.setData(data);
  }
  disconnect() {}
  connect(): Observable<Product[]> {
    return this._dataStream;
  }
  setData(data: Product[]) {
    this._dataStream.next(data);
  }
  
}