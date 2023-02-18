import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthComponent } from './auth.component'
import { ApikeyFormComponent } from './containers/apikey-form/apikey-form.component'

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'apikey', component: ApikeyFormComponent },
     
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
