import { Component } from '@angular/core';

@Component({
    selector: 'home-institution',
    templateUrl: './home-institution.component.html'
})

export class HomeInstitutionComponent {
    private selectedUni = "University of Toronto Mississauga"
    private open = false;

    triggerOpen() {
        this.open = !this.open;
    }

    selectCampus(uni) {
        console.log(uni);
    }
}