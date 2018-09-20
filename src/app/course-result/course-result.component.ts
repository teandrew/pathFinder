import { Component, Input, OnInit} from '@angular/core';
import { Course } from '../models/schema';

@Component({
    selector: 'course-result',
    templateUrl: 'course-result.component.html'
})

export class CourseResultComponent implements OnInit {
    @Input() course: Course;
    avgRating = '0';

    constructor() {}

    ngOnInit () {
        if (this.course['ratings'].reviewCount != 0)
            this.avgRating = Math.round(this.course['ratings'].average / this.course['ratings'].reviewCount).toFixed(1);
    }
}