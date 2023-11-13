import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { ArticlesComponent } from './components/articles/articles.component';



@NgModule({
  declarations: [
    ArticlesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ArticlesComponent },
    ]),
    MatPaginatorModule,
    ScrollingModule
  ]
})
export class ArticlesModule { }
