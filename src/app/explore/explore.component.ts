import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CourseService } from '../course.service';

import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'explore',
  templateUrl: './explore.component.html'
})

export class ExploreComponent implements OnInit {
  campus: string = '';
  searchBy: string;
  searchVal: string = '';
  loading: boolean = false;
  allCourses;
  numOfCourses = 0;
  public searchCriteria = [
    {by: 'Course Code', isActive: true},
    {by: 'Course Name', isActive: false}];
  private searchString$ = new Subject<string>();
  courses$: Observable<any[]>;
  
  constructor(private ar: ActivatedRoute, public cs: CourseService) {
  }

  ngOnInit() {
    this.searchBy = this.searchCriteria[0].by;
    this.ar.params.subscribe((params: Params) => {
      this.campus = params['campus'];
      this.loading = true;
      this.cs.getCourses(this.campus).subscribe(courses => {
        this.allCourses = courses;
        this.numOfCourses = this.allCourses.length;
        this.loading = false;
      })
    })

    this.courses$ = this.searchString$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.cs.getCourses(term))
    );
  }

  clearSearch() {
    this.searchVal = '';
  }

  setActive(crit: Object) {
    this.searchBy = crit['by'];
    for (var i =0;i < this.searchCriteria.length; i++) {
      if (crit['by'] == this.searchCriteria[i].by)
        this.searchCriteria[i].isActive = true;
      else 
        this.searchCriteria[i].isActive = false
    }
  }

  search(text: string) {
    this.searchVal = text;
    this.searchString$.next(text);
  }

  setSearchBy(event: any) {
    this.searchBy = event;
  }
}