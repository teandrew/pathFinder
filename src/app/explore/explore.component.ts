import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'explore',
  templateUrl: './explore.component.html'
})

export class ExploreComponent implements OnInit {
  public campus: string = '';
  public loading: boolean = false;
  public searchVal: string = '';
  public allCourses = [
    {
      code: 'EXE105',
      name: 'Example Course',
      department: 'Example Dept'
    },
    {
      code: 'FRE300',
      name: 'French Courtirielle',
      department: 'Dept of French'
    },
    {
      code: 'FRE300',
      name: 'French Courtirielle',
      department: 'Example Dept'
    },
    {
      code: 'FRE300',
      name: 'French Courtirielle',
      department: 'Example Dept'
    },
    {
      code: 'CRE300',
      name: 'French Courtirielle',
      department: 'Cours ep'
    }
  ]

  constructor(private ar: ActivatedRoute) { }

  ngOnInit() {
    this.ar.params.subscribe((params: Params) => {
      this.campus = params['campus'];
    })
  }

  updateKeyword(keyword: string) {
    this.searchVal = keyword;
  }

}