import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'review',
    templateUrl: './review.component.html'
})

export class ReviewComponent implements OnInit {
    @Input() review: any;
    reviewDate = ''
    constructor() {}

    ngOnInit() {
    }
}