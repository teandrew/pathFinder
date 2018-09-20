// Modules
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Services
import { CookieService } from 'ngx-cookie-service';
import { CourseService } from '../course.service';
import { ReviewService } from '../review.service';

// Components
import { AddReviewComponent } from '../add-review/add-review.component';
import { AppComponent } from '../app/app.component';
import { AppNavComponent } from '../app-nav/app-nav.component';
import { CourseComponent } from '../course/course.component';
import { CourseResultComponent } from '../course-result/course-result.component';
import { ExploreComponent } from '../explore/explore.component';
import { HomeInstitutionComponent } from '../home-institution/home-institution.component';
import { NotFoundComponent } from '../not-found/not-found.component'; 
import { ReviewsComponent } from '../reviews/reviews.component';
import { ReviewComponent } from '../review/review.component';

// Styling
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

// Environment
import { enableProdMode } from '@angular/core';
import { environment } from '../../environments/environment.prod';

if (environment.production)
  enableProdMode();

@NgModule({
  declarations: [
    AddReviewComponent,
    AppComponent,
    AppNavComponent,
    CourseComponent,
    CourseResultComponent,
    ExploreComponent,
    HomeInstitutionComponent,
    NotFoundComponent,
    ReviewComponent,
    ReviewsComponent,
  ],
  imports: [
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ CookieService, CourseService, ReviewService ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
