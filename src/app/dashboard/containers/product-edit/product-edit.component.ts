import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../../dashboard.service';
import { Category } from '../../models/category';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit ,OnDestroy {
  editForm!:FormGroup;
  editSub:any;
  categorySub:any;
  prodSub:any;
  categories!:Category[];
  categoryId!:string;
  product!:Product;
  productId!:number;
  routeSub:any;
  constructor(private snackBar:MatSnackBar,private fb:FormBuilder,private dashBoardService:DashboardService,
    private router:Router,private route:ActivatedRoute) {
      this.editForm=fb.group({
        name:[''],
        quantity:[0,[Validators.required,Validators.min(1)]],
        description:['',[Validators.minLength(10)]],
        category:['',[Validators.required,]]
      })

   }
  ngOnDestroy(): void {
    if(this.categorySub) this.categorySub.unsubscribe();
    if(this.editSub) this.editSub.unsubscribe();
    if(this.routeSub) this.routeSub.unsubscribe();
  }

  ngOnInit(): void {
      this.routeSub=this.route.paramMap.subscribe(param=>{
        this.dashBoardService.getProductById(param.get("id")).subscribe((x:any)=>{
          this.productId=+param.get("id")!;
          this.editForm.patchValue({
            name:x.name,
            quantity:x.quantity,
            description:x.description,
             
          })
          this.categoryId=x.categoryID;
          this.editForm.controls["name"].disable();
        })
      }) 

     this.categorySub=this.dashBoardService.getAllCategory().subscribe((x:any)=>{
         this.categories=x;
         setTimeout(()=>{
       this.editForm.patchValue(
          {["category"]:  this.categories[0].id}
       )},1);
     });
  }
  compareFn(c1: Category, c2: Category): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
}
  onSubmit(){
    this.product={
     
      description:this.editForm.controls["description"].value,
      quantity:this.editForm.controls["quantity"].value,
      categoryID:this.editForm.controls["category"].value,
      productID:this.productId
    }
    this.editSub=this.dashBoardService.updateProduct(this.product).subscribe(x=>{
      this.snackBar.open("Edited Successfully.","X",{
        horizontalPosition: 'center',
        verticalPosition:'top',
        duration: 2000,
        panelClass: ['green-bg']
       })
      this.router.navigate(['dashboard','product','list']);
    })


  }

  getDescErrorMessage(){   
      return "Description field length should be greater than 10";   
  }
  getQuantityErrorMessage(){
    if(this.editForm.controls["quantity"].hasError('min')){
    return "Quantity should be greater than 0.";
    }else{
      return "Please enter the Quantity";
    }
  }

}
