import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DashboardService } from '../../dashboard.service';
import { Category } from '../../models/category';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit,OnDestroy {
  createForm!:FormGroup;
  createSub:any;
  categorySub:any;
  categories!:Category[];
  product!:Product;
  constructor(private snackBar:MatSnackBar,private fb:FormBuilder,private dashBoardService:DashboardService,
    private router:Router) {
      this.createForm=fb.group({
        name:['',[Validators.required]],
        quantity:[0,[Validators.required,Validators.min(1)]],
        description:['',[Validators.minLength(10)]],
        category:['',[Validators.required,]]
      })

   }
  ngOnDestroy(): void {
    if(this.categorySub) this.categorySub.unsubscribe();
    if(this.createSub) this.createSub.unsubscribe();
  }

  ngOnInit(): void {
     this.categorySub=this.dashBoardService.getAllCategory().subscribe((x:any)=>{
         this.categories=x;
       this.createForm.patchValue(
          {["category"]:  this.categories[0].id}
       )
     });
  }
  compareFn(c1: Category, c2: Category): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
}
  onSubmit(){
    this.product={
      name:this.createForm.controls["name"].value,
      description:this.createForm.controls["description"].value,
      quantity:this.createForm.controls["quantity"].value,
      categoryID:this.createForm.controls["category"].value,
    }
    this.createSub=this.dashBoardService.createProduct(this.product).subscribe(x=>{
      this.snackBar.open("Added Successfully.","X",{
        horizontalPosition: 'center',
        verticalPosition:'top',
        duration: 2000,
        panelClass: ['green-bg']
       })
      this.router.navigate(['dashboard','product','list']);
    })


  }
  getNameErrorMessage(){
    return "Please Enter the name";
  }
  getDescErrorMessage(){   
      return "Description field length should be greater than 10";   
  }
  getQuantityErrorMessage(){
    if(this.createForm.controls["quantity"].hasError('min')){
    return "Quantity should be greater than 0.";
    }else{
      return "Please enter the Quantity";
    }
  }

}
