interface Archive {
    archive_id: number;
    language: string;
    book_name: string;
    type: number; //1-3
    pages: number;
    date: Date;
    time: string;
}
export default Archive;