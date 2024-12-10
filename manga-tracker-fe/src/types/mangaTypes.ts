
export interface ImageDto {
    id: number;
    url: string;
    bigUrl: string;
    smallUrl: string;
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
    publishedFrom: string;  // ISO 8601 format date string (could be a string or a Date type)
    publishedTo: string;    // ISO 8601 format date string (could be a string or a Date type)
    images: ImageDto[];
    authors: AuthorDto[];
    genres: GenreDto[];
  }