export class Course {
    code: string;
    department: string;
    description: string;
    institution: string;
}

export class Review {
    comment: string;
    course_id: string;
    difficulty: number;
    interesting: number;
    professor: string;
    reviewedBy: string;
    term: string;
    year: string;
}