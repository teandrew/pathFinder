import { Component, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReviewService } from '../review.service';
import { courseYearValidator } from '../form-validators/courseYear.validator';

@Component({
    selector: 'add-review',
    templateUrl: './add-review.component.html'
})

export class AddReviewComponent {
    @Input() course_id;
    reviewForm: FormGroup;

    constructor(private rs: ReviewService, private fb: FormBuilder) {
        this.reviewForm = fb.group({
            'comment': '',
            'difficulty': [3, Validators.required],
            'interesting': [3, Validators.required],
            'professor': ['', Validators.required],
            'term': ['Fall', Validators.required],
            'year': ['', [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(4),
                courseYearValidator]]
        })
    }

    submitReview() {
        this.reviewForm.value['course_id'] = this.course_id;    
        this.rs.addReview(this.reviewForm.value)
            .then(review => {
                this.resetFields();
                console.log('Review successfully created!');
            })
            .catch(error => alert('Something went wrong! Try again.'));
    }

    resetFields() {
        this.reviewForm.value['comment'] = '';
        this.reviewForm.value['difficulty'] = 3;
        this.reviewForm.value['interesting'] = 3;
        this.reviewForm.value['professor'] = '';
        this.reviewForm.value['term'] = 'Fall';
        this.reviewForm.value['year'] = '';
    }
}