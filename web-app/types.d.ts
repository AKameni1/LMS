type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  videoUrl: string;
  summary: string;
  createdAt: Date | null;
  isLoanedBook?: boolean;
  borrowCount?: number;
};

type User = {
  id: string;
  fullName: string;
  email: string;
  universityId: number;
  universityCard: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
};

type BorrowedBookInfo = {
  borrowDate: Date;
  dueDate: string;
  returnDate: string | null;
  status: 'BORROWED' | 'RETURNED';
  book: Book;
};

type AuthCredentials = {
  fullName: string;
  email: string;
  password: string;
  universityId: number;
  universityCard: string;
};

type BookParams = {
  title: string;
  author: string;
  genre: string;
  rating: number;
  coverUrl: string;
  coverColor: string;
  description: string;
  totalCopies: number;
  videoUrl: string;
  summary: string;
};

type ButtonBookParams = {
  bookId: string;
  userId: string;
};

type Filter = 'oldest' | 'newest' | 'available' | 'highest_rated';

type EmailProps = {
  studentName: string;
};

type CachedBorrowedBooksResult = {
  user: User;
  userBooks: Book[];
  borrowedBooksMap: BorrowBooksMap;
};

type BorrowBooksMap = {
  [key: string]: {
    borrowDate: Date;
    returnDate: string | null;
    dueDate: string;
    status: 'BORROWED' | 'RETURNED';
    book: Book;
  };
};

type Type = 'Library' | 'Favorites' 