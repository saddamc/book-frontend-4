export interface IBook {
  _id: string;
  title: string;
  author: string;
  description: string;
  genre: string;
  isbn: number;
  copies: number;
  available: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBorrow {
  _id: string;
  borrowerName: string;
  book: string;
  quantity: number;
  dueDate: Date;
}

export interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}
export interface BorrowFormInputs {
  borrowerName: string;
  quantity: number;
  dueDate: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

export interface BorrowBookInputs {
  open: boolean;
  isLoading: boolean;
  isError: boolean;
}

export type BorrowSummaryItem = {
  _id: string;
  book: {
    title: string;
    author: string;
    isbn: string;
  };
  totalQuantity: number;
};

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}
