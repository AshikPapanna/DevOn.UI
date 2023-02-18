import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NotfoundComponent } from './shared/components/notfound/notfound.component'
import {AuthGuard} from '../app/guards/auth.guard'

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    canActivate:[AuthGuard],
    loadChildren: () =>  import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: '',
   redirectTo:'auth/apikey',
   pathMatch:'full'
  },
  {
    path: '**',
    component:NotfoundComponent
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing:true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
