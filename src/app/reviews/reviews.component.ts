import { Component, Input, OnInit } from '@angular/core';

import { Course, Review} from '../models/schema';

import { ReviewService } from '../review.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'reviews',
    templateUrl: './reviews.component.html'
})

export class ReviewsComponent implements OnInit {
    @Input() course: Course;
    reviews: Review[];
    userReviewed: boolean;

    constructor(private rs: ReviewService, private cs: CookieService) {}

    ngOnInit() {
        this.rs.getCourseReviews(this.course.code).subscribe(data => { 
            this.reviews = data;          
            if (this.cs.get('c_id'))
                this.userReviewed = data
                            .find(review =>
                                review['reviewedBy'] == this.cs.get('c_id')) ? true : false; 
        })
        // this.hasUserReviewed();
    }

}