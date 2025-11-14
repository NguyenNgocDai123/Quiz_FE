export interface Options {
    id: string;
    content: string;
    is_correct: boolean;
}

export interface Question {
    id: string;
    content: string;
    options: Options[];
    type: string;
    points: number;
}

export interface PaginationResponse<T> {
    page: number;
    page_size: number;
    total_page: number;
    total_items: number;
    next: number | null;
    data: T[];
}
