import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CourseService } from '../course.service';

import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
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
  ask: boolean;
  allCourses;
  filteredCourses;
  numOfCourses = 0;
  public searchCriteria = [
    {by: 'Course Code', isActive: true},
    {by: 'Course Name', isActive: false}];
  
  constructor(private ar: ActivatedRoute, public cs: CourseService) {
  }

  ngOnInit() {
    this.searchBy = this.searchCriteria[0].by;
    this.ar.params.subscribe((params: Params) => {
      this.campus = params['campus'];
    })
    /*
    this.courses$ = this.searchString$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.loading = false),
      switchMap((term: string) => { return this.cs.getCourses(term)}),
      tap(() => this.loading = false),
    );
    */
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
    if (!text)
      return;
    /* this.searchString$.next(text); */
    this.loading = true;
    this.cs.getCourses(this.campus, this.searchVal).subscribe(courses => {
        this.allCourses = courses;
        this.numOfCourses = this.allCourses.length;
        this.loading = false;
    })
  }

  setSearchBy(event: any) {
    this.searchBy = event;
  }


}