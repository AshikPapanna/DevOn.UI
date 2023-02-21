import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from './dashboard.component'
import { ProductCreateComponent } from './containers/product-create/product-create.component'
import { ProductListComponent } from './containers/product-list/product-list.component'
import { ProductEditComponent } from './containers/product-edit/product-edit.component'

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'product',
        children: [
          {
            path: 'list',
            component: ProductListComponent,
          },
          {
            path: 'create',
            component: ProductCreateComponent,
          },
          {
            path: 'edit/:id',
            component: ProductEditComponent,
          },
        ],
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
