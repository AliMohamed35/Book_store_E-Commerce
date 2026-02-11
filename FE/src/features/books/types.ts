export interface Book {
  id: number;
  book_name: string;
  description: string;
  price: number;
  stock: number;
}

export interface BookState {
  book: Book | null;
  isLoading: boolean;
  error: string | null;
}
