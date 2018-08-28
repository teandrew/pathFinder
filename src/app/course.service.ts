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
      courseCollection = this.db.collection('courses');
    else
      courseCollection = this.db.collection('courses',
        ref => ref
          .where('institution', '==', campus.toLowerCase())
          .where('department','==', department));
    return courseCollection.valueChanges();
  }

  getCoursess (term: String): Observable<any[]> {
    const col = this.db.collection('courses');
    return col.valueChanges();
  }
    
  sortCourses (sortBy: string): Observable<any[]> {
    const col = this.db.collection('courses', ref => ref.orderBy(sortBy));
    return col.valueChanges();
  }
    
  getDepartments(): Observable<any[]> {
    const departCollection = this.db.collection('departments', ref => ref.orderBy('name'));
    return departCollection.valueChanges();
  }


}