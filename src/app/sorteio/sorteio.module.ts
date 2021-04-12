import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortearComponent } from './sortear';
import { RouterModule } from '@angular/router';
import { DrawerService } from '../services/drawer.service';
import { FormsModule } from '@angular/forms'


@NgModule({
  declarations: [SortearComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule 
  ],
  providers :[
    DrawerService
  ]
})
export class SorteioModule { }
