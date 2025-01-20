export interface ImageDto {
  id: number;
  imageUrl: string;
  largeImageUrl: string;
  smallImageUrl: string;
  mangaId: number;
}

export interface AuthorDto {
  id: number;
  name: string;
}

export interface GenreDto {
  id: number;
  name: string;
}

export interface MangaDto {
  id: number;
  title: string;
  titleEnglish: string;
  titleJapanese: string;
  type: string;
  volumes: number | null;
  chapters: number | null;
  status: string;
  synopsis: string;
  publishing: boolean;
  popularity: number;
  ranking: number;
  score: number | null;
  scoredBy: number | null;
  publishedFrom: Date;
  publishedTo: Date;
  images: ImageDto[];
  authors: AuthorDto[];
  genres: GenreDto[];
}

export interface CommentDto {
  id: number;
  commentText: string;
  username: string;
  reviewId: number;
  createdAt: string;
}

export interface AddCommentDto {
  commentText: string;
  reviewId: number;
  userId: string;
}

export interface ReviewDto {
  title: string;
  reviewId: number;
  reviewText: string;
  spoiler: boolean;
  rating: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  userId: number;
  mangaId: number;
  comments: CommentDto[];
  username: string;
  createdAt: string;
}

export interface AddReviewDto {
  reviewText: string;
  spoiler: boolean;
  rating: number;
  userId: number;
  mangaId: number;
}
