import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Course } from '../models/schema';
import { CourseService } from '../services/course.service';

@Component({
    selector: 'course',
    templateUrl: './course.component.html'
})

export class CourseComponent implements OnInit{
    course: Course;

    constructor(private  ar: ActivatedRoute, private cs: CourseService) {}

    ngOnInit() {
        this.ar.params.subscribe((params: Params) => {
            let course_id = params['id'];
            this.cs.getCourse(course_id).subscribe(result => { this.course = result })
        }) 
        
    }
}