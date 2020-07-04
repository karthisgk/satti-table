import { NgModule } from '@angular/core';
import { SattiTableComponent } from './satti-table/satti-table.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [SattiTableComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [SattiTableComponent]
})
export class SattiTableModule { }
