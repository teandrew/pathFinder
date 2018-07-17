import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { CourseComponent } from '../course.component';

const appRoutes: Routes = [
    {
        path: '', component: CourseComponent 
    }
]

@NgModule({
    imports: [ RouterModule.forRoot(appRoutes)],
    exports: [ RouterModule ],
})

export class AppRoutingModule {}