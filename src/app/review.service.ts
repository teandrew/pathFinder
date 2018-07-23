import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class ReviewService {
    constructor(private db: AngularFirestore, private cs: CookieService) {}

    // STEPS TO WRITING A REVIEW
    // 1) All required fields are filled out
    // 2) Check if cookie exists, else create
    // 3) If cookie exists and no review then add new review
    addReview(review: Object): any {
        const reviewsCollection = this.db.collection('reviews');
        let cookie_id = '';
        let review_copy = review;

        // Create cookie if not already done
        if (!this.cs.check('c_id'))
            cookie_id = this.createCookieID();
        else
            cookie_id = this.cs.get('c_id');
        
        review_copy['reviewedBy'] = cookie_id;

        return reviewsCollection.add(review_copy).then(review => {
            return this.addCookie(cookie_id);
        })
        .catch(er => console.error(er));
    }  

    createCookieID(): string {
        var cid = "";
        var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < 41; i++)
          cid += possible.charAt(Math.floor(Math.random() * possible.length));
        
        return cid;
    }

    addCookie(c_id: string) {
        const cookieCollection = this.db.collection('cookies');

        this.cs.set('c_id', c_id);
        return cookieCollection.add({'_id': c_id}).catch(err => { return console.error(err)});
    }

    getCourseReviews(course_id: string) {
        const courseReviews = this.db.collection('reviews', ref => ref.where('course_id', '==', course_id));
        return courseReviews.valueChanges();
    }

    getInstitutions() {
        const instCollection = this.db.collection('institutions');
        return instCollection.valueChanges();
    }

    getReviews() {
        const reviewsCollection = this.db.collection('reviews');
        return reviewsCollection.valueChanges();
    }

    hasUserReviewed(): boolean {
        let userHasReviewed = false;

        if (!this.cs.check('c_id'))
            return userHasReviewed;
        
        let userReviews = this.db.collection('reviews',
            ref => ref.where('reviewee_id', '==', this.cs.get('c_id')))

        userReviews.valueChanges().subscribe(userReviewList => {
            if (userReviewList.length != 0)
                userHasReviewed = true;
        });

        return userHasReviewed;
    }

}