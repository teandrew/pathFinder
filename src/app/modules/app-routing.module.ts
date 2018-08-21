import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { CourseComponent } from '../course/course.component';
import { HomeInstitutionComponent } from '../home-institution/home-institution.component';
import { ExploreComponent } from '../explore/explore.component';
import { NotFoundComponent } from '../not-found/not-found.component';

const appRoutes: Routes = [
    { path: 'course/:id', component: CourseComponent },
    { path: '', component: HomeInstitutionComponent },
    { path: 'explore/:campus', component: ExploreComponent },
    { path: '**', component: NotFoundComponent } 
]

@NgModule({
    imports: [ RouterModule.forRoot(appRoutes)],
    exports: [ RouterModule ],
})

export class AppRoutingModule {}