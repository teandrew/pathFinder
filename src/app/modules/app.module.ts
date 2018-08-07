// Modules
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Services
import { CookieService } from 'ngx-cookie-service';
import { CourseService } from '../course.service';
import { ReviewService } from '../review.service';

// Components
import { AddReviewComponent } from '../add-review.component';
import { AppComponent } from '../app.component';
import { AppNavComponent } from '../app-nav.component';
import { CourseComponent } from '../course.component';
import { HomeInstitutionComponent } from '../home-institution.component';
import { ReviewsComponent } from '../reviews.component';
import { ReviewComponent } from '../review.component';

// Environment
import { environment } from '../../environments/environment';

@NgModule({
  declarations: [
    AddReviewComponent,
    AppComponent,
    AppNavComponent,
    CourseComponent,
    HomeInstitutionComponent,
    ReviewComponent,
    ReviewsComponent
  ],
  imports: [
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [ CookieService, CourseService, ReviewService ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
