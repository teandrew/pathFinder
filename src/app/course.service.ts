import { Injectable, Inject } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable() 
export class CourseService {

    constructor(private db: AngularFirestore) {}

    getCourses() {
        const coursesCollection = this.db.collection('courses');
        return coursesCollection.valueChanges();
    }
}