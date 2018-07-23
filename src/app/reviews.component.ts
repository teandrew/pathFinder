import { Component, OnInit } from '@angular/core';

import { ReviewService } from './review.service';

@Component({
    selector: 'reviews',
    templateUrl: './reviews.component.html'
})

export class ReviewsComponent implements OnInit {
    
    constructor(private rs: ReviewService) {}

    ngOnInit() {
        
    }

    addReview() {
        const review = { code: 'CSCTETS' }
        this.rs.addReview(review);
    }
    
}