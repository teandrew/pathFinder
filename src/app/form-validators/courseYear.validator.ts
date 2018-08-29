import { FormControl } from '@angular/forms';

let currentDate = new Date();
export function courseYearValidator(control: FormControl) {
    let year = control.value;

    if (year < '2000' || year > currentDate.getFullYear())
        return { validYear: true };

    return null;
}