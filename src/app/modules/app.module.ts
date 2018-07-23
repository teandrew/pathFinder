// Modules
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Services
import { CookieService } from 'ngx-cookie-service';
import { CourseService } from '../course.service';
import { ReviewService } from '../review.service';

// Components
import { AddReviewComponent } from '../add-review.component';
import { AppComponent } from '../app.component';
import { CourseComponent } from '../course.component';
import { ReviewsComponent } from '../reviews.component';
import { ReviewComponent } from '../review.component';

// Environment
import { environment } from '../../environments/environment';

@NgModule({
  declarations: [
    AddReviewComponent,
    AppComponent,
    CourseComponent,
    ReviewComponent,
    ReviewsComponent
  ],
  imports: [
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    BrowserModule
  ],
  providers: [ CookieService, CourseService, ReviewService ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
