import { Component, OnInit } from '@angular/core';

import { ReviewService } from '../review.service';

@Component({
    selector: 'reviews',
    templateUrl: './reviews.component.html'
})

export class ReviewsComponent implements OnInit {
    reviews: Object;

    constructor(private rs: ReviewService) {}

    ngOnInit() {
        this.rs.getReviews().subscribe(data => {
            this.reviews = data;
        })
    }

    addReview() {
        const review = { code: 'CSCTETS' }
        this.rs.addReview(review);
    }
    
}