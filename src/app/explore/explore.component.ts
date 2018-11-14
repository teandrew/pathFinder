import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CourseService } from '../services/course.service';

import { faBookOpen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'explore',
  templateUrl: './explore2.html'
  //templateUrl: './explore.component.html'
})

export class ExploreComponent implements OnInit {
  faBookOpen = faBookOpen;
  addingFilters = false;
  allCourses: any[];
  campus: string = '';
  departments: any[];
  loading: boolean;
  tags = [];
  numOfCourses = 0;

  showOptions: boolean = false;
  selectedDepart = 'Select Department';
  
  constructor(private ar: ActivatedRoute, public cs: CourseService) {
  }

  ngOnInit() {
    this.ar.params.subscribe((params: Params) => {
      this.campus = params['campus'];
      this.cs.getDepartments(this.campus)
      .subscribe(departs => this.departments = departs); 
    }) 
  }

  getCourses(campus: string, department: string) {
    this.loading = true;
    this.cs.getCourses(campus, department).subscribe(courses => {
      this.allCourses = courses;
      this.numOfCourses = courses.length;
      this.loading = false;
    });
  }

  setShowOptions() {
    this.showOptions = !this.showOptions;
  }

  selectDepart(val: string) {
    console.log('here');
    this.selectedDepart = val;
    this.setShowOptions();
    this.getCourses(this.campus, this.selectedDepart);
  }

  sortCourses(sortBy: string) {
    this.loading = true;
    this.cs.sortCourses(sortBy).subscribe(courses => {
      this.allCourses = courses;
      this.loading = false;
    })
  }

  toggleAddingFilters() {
    this.addingFilters = !this.addingFilters;
  }

  clearAll() {
    this.tags = [];
  }
  
  clearTag() {
    this.tags = [];
  }
}