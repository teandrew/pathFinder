// Modules
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Services
import { CookieService } from 'ngx-cookie-service';

// Components
import { AppComponent } from '../app.component';
import { CourseComponent } from '../course.component';
import { ReviewsComponent } from '../reviews.component';
import { ReviewComponent } from '../review.component';

@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    ReviewComponent,
    ReviewsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule
  ],
  providers: [ CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
