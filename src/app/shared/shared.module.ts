import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { HeaderComponentComponent } from './components/header-component/header-component.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS,MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component'; 




@NgModule({
  declarations: [
    NotfoundComponent,
    HeaderComponentComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,

  ],
  exports:[
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    HeaderComponentComponent,
    HttpClientModule,
    MatInputModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatButtonModule,
    MatSelectModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    DialogComponent
  ],
  providers:[{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}]
})
export class SharedModule { }
