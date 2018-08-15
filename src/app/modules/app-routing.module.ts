import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { CourseComponent } from '../course/course.component';
import { HomeInstitutionComponent } from '../home-institution/home-institution.component';

const appRoutes: Routes = [
    { path: 'home', component: CourseComponent },
    { path: '', component: HomeInstitutionComponent }
]

@NgModule({
    imports: [ RouterModule.forRoot(appRoutes, {enableTracing: true})],
    exports: [ RouterModule ],
})

export class AppRoutingModule {}