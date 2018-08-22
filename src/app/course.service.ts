import { Injectable, Inject } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable() 
export class CourseService {

    constructor(private db: AngularFirestore) {}

    getCourses(campus: String, keyword: String) {

        const coursesCollection = this.db.collection('courses',
            ref => ref
                .where('institution','==', campus.toLowerCase())
                .where('code'.substring(0,keyword.length),'==',keyword)
        );
        return coursesCollection.valueChanges();
    }
}