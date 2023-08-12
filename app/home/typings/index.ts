export declare namespace Home {
  interface Content {
    type: string;
    id: number;
    description: string;
    user: User;
    playlist: string;
    image?: string;
    question?: string;
    options?: Array<Option>;
    flashcard_front?: string;
    flashcard_back?: string;
  }

  interface User {
    name: string;
    avatar: string;
  }

  interface Option {
    id: string;
    answer: string;
  }

  interface MCQAnswer {
    id: number;
    correct_options: Array<Option>;
  }
}
