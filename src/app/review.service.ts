import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Course, Review } from './models/schema';

@Injectable()
export class ReviewService {
    constructor(private db: AngularFirestore, private cs: CookieService) {}

    // STEPS TO WRITING A REVIEW
    // 1) All required fields are filled out
    // 2) Check if cookie exists, else create
    // 3) If cookie exists and no review then add new review
    addCookie(c_id: string) {
        const cookieCollection = this.db.collection('cookies');

        this.cs.set('c_id', c_id);
        return cookieCollection.add({'_id': c_id}).catch(err => { return console.error(err)});
    }

    addReview(review: Object): Promise<firebase.firestore.DocumentReference> {
        const reviewsCollection = this.db.collection('reviews');
        let cookie_id = this.cs.get('c_id');
        let review_copy = review;

        // Create cookie if not already done
        if (cookie_id == '')
            cookie_id = this.createCookieID();
            
        this.addCookie(cookie_id);
        
        review_copy['reviewedBy'] = cookie_id;

        return reviewsCollection.add(review_copy);
    }

    updateCourseRating(course_id: string) {
        const course_ref = this.db.doc<Course>('courses/' + course_id);
    }

    createCookieID(): string {
        var cid = "";
        var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < 41; i++)
          cid += possible.charAt(Math.floor(Math.random() * possible.length));
        
        return cid;
    }
    
    getCourseReviews(course_id: string): Observable<Review[]> {
        const courseReviews = this.db.collection<Review>('reviews', ref => ref.where('course_id', '==', course_id));
        return courseReviews.valueChanges();
    }

    getInstitutions() {
        const instCollection = this.db.collection('institutions');
        return instCollection.valueChanges();
    }
}