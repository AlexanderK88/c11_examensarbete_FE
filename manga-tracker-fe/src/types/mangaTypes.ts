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
  publishedFrom: string;  // ISO 8601 format date string
  publishedTo: string;    // ISO 8601 format date string
  images: ImageDto[];
  authors: AuthorDto[];
  genres: GenreDto[];
}

export interface CommentDto {
  commentText: string;
  userId: number;
  reviewId:number;
}

export interface ReviewDto {
  title: string;
  reviewText: string;
  spoiler: boolean;
  rating:number;
  userId: number;
  mangaId:number;
  comments: CommentDto[];
  username: string;
}

export interface AddReviewDto {
  reviewText: string;
  spoiler: boolean;
  rating:number;
  userId: number;
  mangaId:number;
}
