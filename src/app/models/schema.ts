export class Course {
    code: string;
    department: string;
    description: string;
    name: string;
    prerequisite: string;
    exclusion: string;
    institution: string;
    ratings: {
        average: number,
        reviewCount: number
    }
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