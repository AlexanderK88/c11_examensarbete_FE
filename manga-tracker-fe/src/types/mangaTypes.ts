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
  scoredBy: number;
  publishedFrom: string;
  publishedTo: string;
  images: ImageDto[];
  authors: AuthorDto[];
  genres: GenreDto[];
}

export interface CommentDto {
  commentText: string;
  username: string;
  reviewId:number;
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
  rating:number;
  userId: number;
  mangaId:number;
  comments: CommentDto[];
  username: string;
  createdAt: string;
}

export interface AddReviewDto {
  reviewText: string;
  spoiler: boolean;
  rating:number;
  userId: number;
  mangaId:number;
}
