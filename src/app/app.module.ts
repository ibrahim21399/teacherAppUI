import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActiveStudentsComponent } from './student/active-students/active-students.component';
import { BlockedStudentsComponent } from './student/blocked-students/blocked-students.component';



@NgModule({
  declarations: [
    AppComponent,
    ActiveStudentsComponent,
    BlockedStudentsComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
