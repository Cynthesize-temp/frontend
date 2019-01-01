import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './loader/loader.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LikingComponent } from './liking/liking.component';
import { CommentsComponent } from './comments/comments.component';

@NgModule({
  imports: [FlexLayoutModule, MaterialModule, CommonModule],
  declarations: [LoaderComponent, NotFoundComponent, LikingComponent, CommentsComponent],
  exports: [LoaderComponent, LikingComponent, CommentsComponent]
})
export class SharedModule {}
