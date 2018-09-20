import { Injectable, Inject } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

import { Course } from './models/schema';

@Injectable() 
export class CourseService {

  constructor(private db: AngularFirestore) {}

  getCourse(code: string) {
    const courseDocument = this.db.doc<Course>('courses/' + code);
    return courseDocument.valueChanges()
  }

  getCourses(campus: string, department: string) {
    let courseCollection;
    if (department == 'Any')
      courseCollection = this.db.collection('courses',
        ref => ref
          .where('institution', '==', campus.toLowerCase())
          .limit(200));
    else
      courseCollection = this.db.collection('courses',
        ref => ref
          .where('institution', '==', campus.toLowerCase())
          .where('department','==', department)
          .limit(200));
    return courseCollection.valueChanges();
  }

  getNextCourses(campus: string, department:string) {
    let courseCollection;
    if (department == 'Any')
      courseCollection = this.db.collection('courses',
        ref => ref
          .where('institution', '==', campus.toLowerCase())
          .limit(200));
    else
      courseCollection = this.db.collection('courses',
        ref => ref
          .where('institution', '==', campus.toLowerCase())
          .where('department','==', department)
          .limit(200));
    return courseCollection.valueChanges();
  }
    
  sortCourses (sortBy: string): Observable<any[]> {
    const col = this.db.collection('courses',
      ref => ref
        .orderBy(sortBy)
        .limit(200));
    return col.valueChanges();
  }
    
  getDepartments(campus: string): Observable<any[]> {
    const departCollection = this.db.collection('departments',
      ref => ref
        .where('institution','==',campus.toLowerCase())
        .orderBy('title'));
    return departCollection.valueChanges();
  }

  
}