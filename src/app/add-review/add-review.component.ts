import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReviewService } from '../review.service';

@Component({
    selector: 'add-review',
    templateUrl: './add-review.component.html'
})

export class AddReviewComponent {
    reviewForm: FormGroup;

    constructor(private rs: ReviewService, private fb: FormBuilder) {
        this.reviewForm = fb.group({
            'comment': '',
            'difficulty': [3, Validators.required],
            'interesting': [3, Validators.required],
            'professor': '',
            'term': ['Fall', Validators.required],
            'year': ['', Validators.required]
        })
    }

    submitReview() {
        this.rs.addReview(this.reviewForm.value);
    }
}