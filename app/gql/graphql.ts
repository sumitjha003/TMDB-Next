/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type CastAndCrew = {
  __typename?: 'CastAndCrew';
  adult?: Maybe<Scalars['Boolean']['output']>;
  alsoKnownAs?: Maybe<Scalars['String']['output']>;
  biography?: Maybe<Scalars['String']['output']>;
  birthday?: Maybe<Scalars['DateTime']['output']>;
  character?: Maybe<Scalars['String']['output']>;
  characterAdult?: Maybe<Scalars['Boolean']['output']>;
  characterGender?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  creditType?: Maybe<Scalars['String']['output']>;
  deathday?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  department?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  homePage?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  job?: Maybe<Scalars['String']['output']>;
  knownForDepartment?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  placeOfBirth?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Float']['output']>;
  profilePath?: Maybe<Scalars['String']['output']>;
  tmdbId?: Maybe<Scalars['ID']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export enum CharacterGender {
  Female = 'FEMALE',
  Male = 'MALE',
  Other = 'OTHER'
}

export type CommonMessageResponse = {
  __typename?: 'CommonMessageResponse';
  message?: Maybe<Scalars['String']['output']>;
};

export type CountriesFilter = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type CountriesResponse = {
  __typename?: 'CountriesResponse';
  count?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<Maybe<Country>>>;
};

export type Country = {
  __typename?: 'Country';
  countryCode?: Maybe<Scalars['String']['output']>;
  englishName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type CreateCollectionResponse = {
  __typename?: 'CreateCollectionResponse';
  collection?: Maybe<CollectionData>;
  message: Scalars['String']['output'];
};

export type CreateEpisodeInput = {
  episodes?: InputMaybe<Array<InputMaybe<EpisodeInput>>>;
};

export type CreatePersonResponse = {
  __typename?: 'CreatePersonResponse';
  data?: Maybe<Person>;
  message?: Maybe<Scalars['String']['output']>;
};

export type CreateSeasonInput = {
  seasons?: InputMaybe<Array<InputMaybe<SeasonInput>>>;
};

export type CreateTvEpisodeResponse = {
  __typename?: 'CreateTvEpisodeResponse';
  data?: Maybe<Array<Maybe<Episode>>>;
  message?: Maybe<Scalars['String']['output']>;
};

export type CreateTvResponse = {
  __typename?: 'CreateTvResponse';
  data?: Maybe<Tv>;
  message?: Maybe<Scalars['String']['output']>;
};

export type CreateTvSeasonResponse = {
  __typename?: 'CreateTvSeasonResponse';
  data?: Maybe<Array<Maybe<Season>>>;
  message?: Maybe<Scalars['String']['output']>;
};

export type CreateUpdateGenreResponse = {
  __typename?: 'CreateUpdateGenreResponse';
  genre?: Maybe<GenreData>;
  message?: Maybe<Scalars['String']['output']>;
};

export type CreditInput = {
  character?: InputMaybe<Scalars['String']['input']>;
  characterAdult?: InputMaybe<Scalars['Boolean']['input']>;
  characterGender?: InputMaybe<CharacterGender>;
  creditType?: InputMaybe<MovieCreditType>;
  department?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  job?: InputMaybe<Scalars['String']['input']>;
  person: CreditPersonInput;
};

export type CreditPersonInput = {
  adult?: InputMaybe<Scalars['Boolean']['input']>;
  alsoKnownAs?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  biography?: InputMaybe<Scalars['String']['input']>;
  birthday?: InputMaybe<Scalars['DateTime']['input']>;
  deathday?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['Int']['input']>;
  homePage?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  knownForDepartment?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  placeOfBirth?: InputMaybe<Scalars['String']['input']>;
  popularity?: InputMaybe<Scalars['Float']['input']>;
  profilePath?: InputMaybe<Scalars['String']['input']>;
  tmdbId?: InputMaybe<Scalars['String']['input']>;
};

export enum CreditType {
  Cast = 'CAST',
  Crew = 'CREW',
  GuestStar = 'GUEST_STAR'
}

export type Credits = {
  __typename?: 'Credits';
  character?: Maybe<Scalars['String']['output']>;
  characterAdult?: Maybe<Scalars['Boolean']['output']>;
  characterGender?: Maybe<CharacterGender>;
  creditType?: Maybe<CreditType>;
  department?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  job?: Maybe<Scalars['String']['output']>;
  mediaId?: Maybe<Scalars['String']['output']>;
  mediaType?: Maybe<MediaType>;
  order?: Maybe<Scalars['Int']['output']>;
  person?: Maybe<Person>;
  tmdbId?: Maybe<Scalars['String']['output']>;
};

export type Data = {
  __typename?: 'Data';
  backdropData?: Maybe<Scalars['String']['output']>;
  collections?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  companies?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  countries?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  credits?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  genres?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  languages?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  movie?: Maybe<Movie>;
  posterData?: Maybe<Scalars['String']['output']>;
};

export type DataToUpdate = {
  description?: InputMaybe<Scalars['String']['input']>;
  headquarters?: InputMaybe<Scalars['String']['input']>;
  homepage?: InputMaybe<Scalars['String']['input']>;
  logoPath?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  originCountry?: InputMaybe<Scalars['String']['input']>;
  parentCompany?: InputMaybe<Scalars['String']['input']>;
};

export type DeleteEpisodeResponse = {
  __typename?: 'DeleteEpisodeResponse';
  data?: Maybe<Tv>;
  message?: Maybe<Scalars['String']['output']>;
};

export type DeleteSeasonResponse = {
  __typename?: 'DeleteSeasonResponse';
  data?: Maybe<Tv>;
  message?: Maybe<Scalars['String']['output']>;
};

export type DeleteTvResponse = {
  __typename?: 'DeleteTvResponse';
  data?: Maybe<Tv>;
  message?: Maybe<Scalars['String']['output']>;
};

export type EmailPasswordForgotPasswordData = {
  email: Scalars['String']['input'];
};

export type EmailPasswordForgotPasswordResponse = {
  __typename?: 'EmailPasswordForgotPasswordResponse';
  data?: Maybe<EmailPasswordForgotPasswordResponseData>;
  message?: Maybe<Scalars['String']['output']>;
};

export type EmailPasswordForgotPasswordResponseData = {
  __typename?: 'EmailPasswordForgotPasswordResponseData';
  token?: Maybe<Scalars['String']['output']>;
};

export type EmailPasswordLogInData = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type EmailPasswordLogInResponse = {
  __typename?: 'EmailPasswordLogInResponse';
  data?: Maybe<EmailPasswordLogInResponseData>;
  message?: Maybe<Scalars['String']['output']>;
};

export type EmailPasswordLogInResponseData = {
  __typename?: 'EmailPasswordLogInResponseData';
  refreshToken?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type EmailPasswordResetPasswordData = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type EmailPasswordSignUpData = {
  email: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
};

export type EmailPasswordSignUpResponse = {
  __typename?: 'EmailPasswordSignUpResponse';
  message?: Maybe<Scalars['String']['output']>;
};

export type EmailPasswordVerifyResetTokenData = {
  token: Scalars['String']['input'];
};

export type EmailPasswordVerifyResetTokenResponse = {
  __typename?: 'EmailPasswordVerifyResetTokenResponse';
  data?: Maybe<EmailPasswordVerifyResetTokenResponseData>;
  message?: Maybe<Scalars['String']['output']>;
};

export type EmailPasswordVerifyResetTokenResponseData = {
  __typename?: 'EmailPasswordVerifyResetTokenResponseData';
  isValidToken?: Maybe<Scalars['Boolean']['output']>;
};

export type Episode = {
  __typename?: 'Episode';
  airDate?: Maybe<Scalars['DateTime']['output']>;
  episodeNumber?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  productionCode?: Maybe<Scalars['String']['output']>;
  seasonId?: Maybe<Scalars['Int']['output']>;
  stillPath?: Maybe<Scalars['String']['output']>;
  tmdbId?: Maybe<Scalars['ID']['output']>;
  tvId?: Maybe<Scalars['ID']['output']>;
  voteAverage?: Maybe<Scalars['String']['output']>;
  voteCount?: Maybe<Scalars['Int']['output']>;
};

export type EpisodeInput = {
  airDate?: InputMaybe<Scalars['DateTime']['input']>;
  credits?: InputMaybe<Array<InputMaybe<CreditInput>>>;
  episodeId?: InputMaybe<Scalars['ID']['input']>;
  episodeNumber?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  overview?: InputMaybe<Scalars['String']['input']>;
  productionCode?: InputMaybe<Scalars['String']['input']>;
  stillPath?: InputMaybe<Scalars['String']['input']>;
  tmdbId?: InputMaybe<Scalars['ID']['input']>;
  voteAverage?: InputMaybe<Scalars['String']['input']>;
  voteCount?: InputMaybe<Scalars['Int']['input']>;
};

export type Favorite = {
  __typename?: 'Favorite';
  accountId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  movie?: Maybe<Movie>;
  reference?: Maybe<Reference>;
  referenceId?: Maybe<Scalars['String']['output']>;
  tv?: Maybe<Tv>;
};

export enum GenderType {
  Female = 'FEMALE',
  Male = 'MALE',
  Other = 'OTHER'
}

export type Genre = {
  __typename?: 'Genre';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type GenreInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type GetCollectionResponse = {
  __typename?: 'GetCollectionResponse';
  backdropPath?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  parts?: Maybe<Array<Maybe<MovieData>>>;
  posterPath?: Maybe<Scalars['String']['output']>;
  tmdbId?: Maybe<Scalars['Int']['output']>;
};

export enum ImageType {
  Backdrops = 'BACKDROPS',
  Poster = 'POSTER',
  Profiles = 'PROFILES'
}

export type Images = {
  __typename?: 'Images';
  aspectRatio: Scalars['Float']['output'];
  collectionId: Scalars['ID']['output'];
  filePath: Scalars['String']['output'];
  height: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  imageType?: Maybe<ImageType>;
  languageCode: Scalars['String']['output'];
  mediaId: Scalars['ID']['output'];
  mediaType: MediaType;
  personId: Scalars['ID']['output'];
  voteAverage: Scalars['Float']['output'];
  voteCount: Scalars['Int']['output'];
  width: Scalars['Int']['output'];
};

export type Language = {
  __typename?: 'Language';
  englishName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  languageCode?: Maybe<Scalars['String']['output']>;
};

export type LanguagesFilter = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type LanguagesResponse = {
  __typename?: 'LanguagesResponse';
  count?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<Maybe<Language>>>;
};

export type ListCreditMovieFilter = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
};

export type ListMoviesFilter = {
  category?: InputMaybe<MoviesCategory>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type ListMoviesSort = {
  field?: InputMaybe<ListMoviesSortFields>;
  order?: InputMaybe<SortOrder>;
};

export enum ListMoviesSortFields {
  CreatedAt = 'createdAt',
  Popularity = 'popularity',
  ReleaseDate = 'releaseDate',
  UpdatedAt = 'updatedAt',
  VoteAverage = 'voteAverage'
}

export type ListPersonsFilter = {
  category?: InputMaybe<PersonCategory>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type ListPersonsSort = {
  field?: InputMaybe<ListPersonsSortFields>;
  order?: InputMaybe<SortOrder>;
};

export enum ListPersonsSortFields {
  CreatedAt = 'createdAt',
  Name = 'name',
  UpdatedAt = 'updatedAt'
}

export type ListProductionCompanyResponse = {
  __typename?: 'ListProductionCompanyResponse';
  count: Scalars['Int']['output'];
  data?: Maybe<Array<ProductionCompany>>;
  message: Scalars['String']['output'];
};

export type ListTvsFilter = {
  category?: InputMaybe<TvSeriesCategory>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type ListTvsSort = {
  field?: InputMaybe<ListTvsSortFields>;
  order?: InputMaybe<SortOrder>;
};

export enum ListTvsSortFields {
  CreatedAt = 'createdAt',
  Name = 'name',
  UpdatedAt = 'updatedAt'
}

export enum MediaType {
  Episode = 'EPISODE',
  Movie = 'MOVIE',
  Season = 'SEASON',
  Tv = 'TV'
}

export type Movie = {
  __typename?: 'Movie';
  adult?: Maybe<Scalars['Boolean']['output']>;
  budget?: Maybe<Scalars['Int']['output']>;
  castAndCrew?: Maybe<Array<Maybe<CastAndCrew>>>;
  countries?: Maybe<Array<Maybe<Country>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  genres?: Maybe<Array<Maybe<Genre>>>;
  homePage?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  languages?: Maybe<Array<Maybe<Language>>>;
  movieCollection?: Maybe<Array<Maybe<CollectionData>>>;
  movieImages?: Maybe<Array<Maybe<Images>>>;
  movieVideo?: Maybe<Array<Maybe<Video>>>;
  originalLanguage?: Maybe<Scalars['String']['output']>;
  originalTitle?: Maybe<Scalars['String']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Float']['output']>;
  releaseDate?: Maybe<Scalars['Date']['output']>;
  revenue?: Maybe<Scalars['Int']['output']>;
  runtime?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  streamingOn?: Maybe<Scalars['String']['output']>;
  tagline?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  video?: Maybe<Scalars['Boolean']['output']>;
  voteAverage?: Maybe<Scalars['Float']['output']>;
  voteCount?: Maybe<Scalars['Int']['output']>;
};

export enum MovieCreditType {
  Cast = 'CAST',
  Crew = 'CREW'
}

export type MovieInput = {
  adult: Scalars['Boolean']['input'];
  budget: Scalars['Int']['input'];
  collections?: InputMaybe<Array<InputMaybe<CollectionInputData>>>;
  companies?: InputMaybe<Array<InputMaybe<ProductionCompanyInput>>>;
  countryIds?: InputMaybe<Array<Scalars['String']['input']>>;
  credits?: InputMaybe<Array<InputMaybe<CreditInput>>>;
  genres?: InputMaybe<Array<InputMaybe<GenreInput>>>;
  languageIds?: InputMaybe<Array<Scalars['String']['input']>>;
  originalLanguage: Scalars['String']['input'];
  originalTitle: Scalars['String']['input'];
  overview: Scalars['String']['input'];
  releaseDate: Scalars['Date']['input'];
  revenue: Scalars['Int']['input'];
  runtime: Scalars['Int']['input'];
  status: Scalars['String']['input'];
  tagline: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type MovieRatingInput = {
  rate?: InputMaybe<Scalars['Float']['input']>;
  reference?: InputMaybe<Reference>;
  referenceId?: InputMaybe<Scalars['String']['input']>;
};

export type MovieResponse = {
  __typename?: 'MovieResponse';
  data?: Maybe<Movie>;
  message?: Maybe<Scalars['String']['output']>;
};

export type MovieSuccessResponse = {
  __typename?: 'MovieSuccessResponse';
  data?: Maybe<Data>;
  message?: Maybe<Scalars['String']['output']>;
};

export type MovieSuccessResponseList = {
  __typename?: 'MovieSuccessResponseList';
  count?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<Maybe<Movie>>>;
  message?: Maybe<Scalars['String']['output']>;
};

export enum MoviesCategory {
  Latest = 'LATEST',
  PlayingInTheaters = 'PLAYING_IN_THEATERS',
  Popular = 'POPULAR',
  TopRated = 'TOP_RATED',
  Upcoming = 'UPCOMING'
}

export type MoviesFilter = {
  category?: InputMaybe<MoviesCategory>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type MoviesResponseList = {
  __typename?: 'MoviesResponseList';
  count?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<Maybe<Movie>>>;
  message?: Maybe<Scalars['String']['output']>;
};

export type MoviesSignedPutUrlDataInput = {
  fileName: Scalars['String']['input'];
  movieId?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCollection?: Maybe<CreateCollectionResponse>;
  createEpisode?: Maybe<CreateTvEpisodeResponse>;
  createFavoriteMovie: FavoriteMovieResponse;
  createGenre?: Maybe<CreateUpdateGenreResponse>;
  createMovie?: Maybe<MovieSuccessResponse>;
  createMovieRating: MovieRatingResponse;
  createPerson?: Maybe<CreatePersonResponse>;
  createProductionCompany?: Maybe<ProductionCompanyResponse>;
  createTvSeason?: Maybe<CreateTvSeasonResponse>;
  createTvSeries?: Maybe<CreateTvResponse>;
  createWatchListMovie: WatchListMovieResponse;
  deleteCollection?: Maybe<UpdateDeleteCollectionResponse>;
  deleteEpisode?: Maybe<DeleteEpisodeResponse>;
  deleteFavoriteMovie: DeleteFavoriteMovieResponse;
  deleteGenre?: Maybe<CreateUpdateGenreResponse>;
  deleteMovie?: Maybe<MovieSuccessResponse>;
  deleteMovieRating: DeleteMovieRatingResponse;
  deletePerson?: Maybe<DeletePersonResponse>;
  deleteProductionCompany?: Maybe<ProductionCompanyResponse>;
  deleteTvSeason?: Maybe<DeleteSeasonResponse>;
  deleteTvSeries?: Maybe<DeleteTvResponse>;
  deleteWatchListMovie: DeleteWatchListMovieResponse;
  emailPasswordForgotPassword?: Maybe<EmailPasswordForgotPasswordResponse>;
  emailPasswordLogIn?: Maybe<EmailPasswordLogInResponse>;
  emailPasswordResetPassword?: Maybe<CommonMessageResponse>;
  emailPasswordSignUp?: Maybe<EmailPasswordSignUpResponse>;
  emailPasswordVerifyResetToken?: Maybe<EmailPasswordVerifyResetTokenResponse>;
  /** FIREBASE AUTH */
  forgetPassword?: Maybe<UpdateAccountResponse>;
  logout?: Maybe<CommonMessageResponse>;
  /** CUSTOM AUTH */
  sendLoginOtp?: Maybe<SendLoginOtpResponse>;
  updateCollection?: Maybe<UpdateDeleteCollectionResponse>;
  updateCurrentUser?: Maybe<UpdateCurrentUserResponse>;
  updateEpisode?: Maybe<UpdateTvEpisodeResponse>;
  updateGenre?: Maybe<CreateUpdateGenreResponse>;
  updateMovie?: Maybe<MovieSuccessResponse>;
  updatePassword?: Maybe<UpdateAccountResponse>;
  updatePerson?: Maybe<CreatePersonResponse>;
  updateProductionCompany?: Maybe<ProductionCompanyResponse>;
  updateTvSeason?: Maybe<UpdateTvSeasonResponse>;
  updateTvSeries?: Maybe<CreateTvResponse>;
  verifyLoginOtp?: Maybe<VerifyLoginOtpResponse>;
};


export type MutationCreateCollectionArgs = {
  data: CollectionInputData;
};


export type MutationCreateEpisodeArgs = {
  data: CreateEpisodeInput;
  seasonId: Scalars['ID']['input'];
};


export type MutationCreateFavoriteMovieArgs = {
  data: FavoriteMovieInput;
};


export type MutationCreateGenreArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreateMovieArgs = {
  data?: InputMaybe<MovieInput>;
};


export type MutationCreateMovieRatingArgs = {
  data: MovieRatingInput;
};


export type MutationCreatePersonArgs = {
  data: PersonInput;
};


export type MutationCreateProductionCompanyArgs = {
  data: ProductionCompanyInput;
};


export type MutationCreateTvSeasonArgs = {
  data: CreateSeasonInput;
  tvId: Scalars['ID']['input'];
};


export type MutationCreateTvSeriesArgs = {
  data: TvInput;
};


export type MutationCreateWatchListMovieArgs = {
  data: WatchListMovieInput;
};


export type MutationDeleteCollectionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteEpisodeArgs = {
  episodeId: Scalars['ID']['input'];
};


export type MutationDeleteFavoriteMovieArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteGenreArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteMovieArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteMovieRatingArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeletePersonArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteProductionCompanyArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTvSeasonArgs = {
  seasonId: Scalars['ID']['input'];
};


export type MutationDeleteTvSeriesArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteWatchListMovieArgs = {
  id: Scalars['ID']['input'];
};


export type MutationEmailPasswordForgotPasswordArgs = {
  data: EmailPasswordForgotPasswordData;
};


export type MutationEmailPasswordLogInArgs = {
  data: EmailPasswordLogInData;
};


export type MutationEmailPasswordResetPasswordArgs = {
  data: EmailPasswordResetPasswordData;
};


export type MutationEmailPasswordSignUpArgs = {
  data: EmailPasswordSignUpData;
};


export type MutationEmailPasswordVerifyResetTokenArgs = {
  data: EmailPasswordVerifyResetTokenData;
};


export type MutationForgetPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationSendLoginOtpArgs = {
  email: Scalars['String']['input'];
};


export type MutationUpdateCollectionArgs = {
  data?: InputMaybe<CollectionDataToUpdate>;
  id: Scalars['ID']['input'];
};


export type MutationUpdateCurrentUserArgs = {
  data: UpdateCurrentUserInput;
};


export type MutationUpdateEpisodeArgs = {
  data: UpdteEpisodeInput;
  episodeId: Scalars['ID']['input'];
};


export type MutationUpdateGenreArgs = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateMovieArgs = {
  data?: InputMaybe<UpdateMovieInput>;
  id: Scalars['ID']['input'];
};


export type MutationUpdatePersonArgs = {
  data: UpdatePersonInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateProductionCompanyArgs = {
  data: DataToUpdate;
  id: Scalars['ID']['input'];
};


export type MutationUpdateTvSeasonArgs = {
  data: UpdteSeasonInput;
  seasonId: Scalars['ID']['input'];
};


export type MutationUpdateTvSeriesArgs = {
  data: TvUpdateInput;
  id: Scalars['ID']['input'];
};


export type MutationVerifyLoginOtpArgs = {
  data: VerifyLoginOtpInput;
};

export type Person = {
  __typename?: 'Person';
  adult?: Maybe<Scalars['Boolean']['output']>;
  alsoKnownAs?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  biography?: Maybe<Scalars['String']['output']>;
  birthday?: Maybe<Scalars['DateTime']['output']>;
  deathday?: Maybe<Scalars['DateTime']['output']>;
  gender?: Maybe<GenderType>;
  homePage?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  knownForDepartment?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  placeOfBirth?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Float']['output']>;
  profilePath?: Maybe<Scalars['String']['output']>;
  tmdbId?: Maybe<Scalars['String']['output']>;
};

export enum PersonCategory {
  Trending = 'TRENDING',
  WhatsPopular = 'WHATS_POPULAR'
}

export type PersonInput = {
  adult?: InputMaybe<Scalars['Boolean']['input']>;
  alsoKnownAs?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  biography?: InputMaybe<Scalars['String']['input']>;
  birthday?: InputMaybe<Scalars['DateTime']['input']>;
  deathday?: InputMaybe<Scalars['DateTime']['input']>;
  gender?: InputMaybe<GenderType>;
  homePage?: InputMaybe<Scalars['String']['input']>;
  knownForDepartment?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  placeOfBirth?: InputMaybe<Scalars['String']['input']>;
  popularity?: InputMaybe<Scalars['Float']['input']>;
  profilePath?: InputMaybe<Scalars['String']['input']>;
  tmdbId?: InputMaybe<Scalars['String']['input']>;
};

export type PersonResponse = {
  __typename?: 'PersonResponse';
  data?: Maybe<Person>;
  message?: Maybe<Scalars['String']['output']>;
};

export type PersonsResponseList = {
  __typename?: 'PersonsResponseList';
  count?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<Maybe<Person>>>;
  message?: Maybe<Scalars['String']['output']>;
};

export type ProductionCompany = {
  __typename?: 'ProductionCompany';
  description?: Maybe<Scalars['String']['output']>;
  headquarters?: Maybe<Scalars['String']['output']>;
  homepage?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  logoPath?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  originCountry?: Maybe<Scalars['String']['output']>;
  parentCompany?: Maybe<Scalars['String']['output']>;
};

export type ProductionCompanyInput = {
  description: Scalars['String']['input'];
  headquarters: Scalars['String']['input'];
  homepage: Scalars['String']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
  logoPath: Scalars['String']['input'];
  name: Scalars['String']['input'];
  originCountry: Scalars['String']['input'];
  parentCompany: Scalars['String']['input'];
};

export type ProductionCompanyResponse = {
  __typename?: 'ProductionCompanyResponse';
  data: ProductionCompany;
  message: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  countries?: Maybe<CountriesResponse>;
  getCollection?: Maybe<GetCollectionResponse>;
  getCurrentUser?: Maybe<User>;
  getFavoriteMovies?: Maybe<Array<Maybe<Favorite>>>;
  getFavoriteTv?: Maybe<Array<Maybe<Favorite>>>;
  getMovieRatings?: Maybe<Array<Maybe<Rating>>>;
  getMoviesSignedPutUrl: SignedUrlType;
  getTvRatings?: Maybe<Array<Maybe<Rating>>>;
  getWatchListMovies?: Maybe<Array<Maybe<WatchList>>>;
  getWatchListTv?: Maybe<Array<Maybe<WatchList>>>;
  languages?: Maybe<LanguagesResponse>;
  listGenre?: Maybe<Array<Maybe<GenreData>>>;
  listMovieCredits: GetCastCrewResponse;
  listMovies?: Maybe<MovieSuccessResponseList>;
  listPersonMovieCredits?: Maybe<GetPersonMovieResponse>;
  listPersons?: Maybe<PersonsResponseList>;
  listProductionCompanies?: Maybe<ListProductionCompanyResponse>;
  listRecommended?: Maybe<RecommandedResponse>;
  listTvCredits: GetCastCrewResponse;
  listTvs?: Maybe<TvsResponseList>;
  movie?: Maybe<MovieResponse>;
  movies?: Maybe<MoviesResponseList>;
  person?: Maybe<PersonResponse>;
  /** CUSTOM AUTH */
  refreshToken?: Maybe<RefreshTokenRes>;
  seasons?: Maybe<Tv>;
  tvSeasonDetails?: Maybe<Season>;
  tvSeriesDetails?: Maybe<Tv>;
  /** FIREBASE AUTH */
  verifyAccount?: Maybe<VerifyAccountResponse>;
};


export type QueryCountriesArgs = {
  filter?: InputMaybe<CountriesFilter>;
};


export type QueryGetCollectionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetMoviesSignedPutUrlArgs = {
  data: MoviesSignedPutUrlDataInput;
};


export type QueryLanguagesArgs = {
  filter?: InputMaybe<LanguagesFilter>;
};


export type QueryListMovieCreditsArgs = {
  filter?: InputMaybe<ListCreditMovieFilter>;
  id: Scalars['ID']['input'];
};


export type QueryListMoviesArgs = {
  filter?: InputMaybe<ListMoviesFilter>;
  sort?: InputMaybe<ListMoviesSort>;
};


export type QueryListPersonMovieCreditsArgs = {
  filter?: InputMaybe<ListCreditMovieFilter>;
  id: Scalars['ID']['input'];
};


export type QueryListPersonsArgs = {
  filter: ListPersonsFilter;
  sort: ListPersonsSort;
};


export type QueryListRecommendedArgs = {
  category?: InputMaybe<RecommendedCategry>;
};


export type QueryListTvCreditsArgs = {
  id: Scalars['ID']['input'];
};


export type QueryListTvsArgs = {
  filter: ListTvsFilter;
  sort: ListTvsSort;
};


export type QueryMovieArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMoviesArgs = {
  filter: MoviesFilter;
  sort: ListMoviesSort;
};


export type QueryPersonArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRefreshTokenArgs = {
  data: RefreshTokenInput;
};


export type QuerySeasonsArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTvSeasonDetailsArgs = {
  id: Scalars['ID']['input'];
  seasonNumber?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTvSeriesDetailsArgs = {
  id: Scalars['ID']['input'];
};

export type Rating = {
  __typename?: 'Rating';
  accountId?: Maybe<Scalars['String']['output']>;
  movie?: Maybe<Movie>;
  rate?: Maybe<Scalars['Float']['output']>;
  reference?: Maybe<Reference>;
  referenceId?: Maybe<Scalars['String']['output']>;
  tv?: Maybe<Tv>;
};

export type RecommandedResponse = {
  __typename?: 'RecommandedResponse';
  count?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Scalars['JSON']['output']>;
};

export enum RecommendedCategry {
  Movie = 'MOVIE',
  Tv = 'TV'
}

export enum Reference {
  Movie = 'MOVIE',
  Tv = 'TV'
}

export type RefreshTokenInput = {
  refreshToken: Scalars['String']['input'];
};

export type RefreshTokenRes = {
  __typename?: 'RefreshTokenRes';
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type Season = {
  __typename?: 'Season';
  airDate?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  seasonEpisode?: Maybe<Array<Maybe<Episode>>>;
  seasonNumber?: Maybe<Scalars['Int']['output']>;
  tmdbId?: Maybe<Scalars['ID']['output']>;
  tvId?: Maybe<Scalars['ID']['output']>;
};

export type SeasonInput = {
  airDate?: InputMaybe<Scalars['DateTime']['input']>;
  credits?: InputMaybe<Array<InputMaybe<CreditInput>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  overview?: InputMaybe<Scalars['String']['input']>;
  seasonEpisodes?: InputMaybe<Array<InputMaybe<EpisodeInput>>>;
  seasonId?: InputMaybe<Scalars['ID']['input']>;
  seasonNumber?: InputMaybe<Scalars['Int']['input']>;
  tmdbId?: InputMaybe<Scalars['ID']['input']>;
};

export type SendLoginOtpResponse = {
  __typename?: 'SendLoginOtpResponse';
  data?: Maybe<SendLoginOtpResponseData>;
  message?: Maybe<Scalars['String']['output']>;
};

export type SendLoginOtpResponseData = {
  __typename?: 'SendLoginOtpResponseData';
  otp?: Maybe<Scalars['Int']['output']>;
};

export type SignedUrlType = {
  __typename?: 'SignedUrlType';
  key?: Maybe<Scalars['String']['output']>;
  signedUrl?: Maybe<Scalars['String']['output']>;
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Tv = {
  __typename?: 'Tv';
  castAndCrew?: Maybe<Array<Maybe<CastAndCrew>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  episodeRunTime?: Maybe<Scalars['Float']['output']>;
  firstAirDate?: Maybe<Scalars['DateTime']['output']>;
  genres?: Maybe<Array<Maybe<Genre>>>;
  id?: Maybe<Scalars['ID']['output']>;
  inProduction?: Maybe<Scalars['Boolean']['output']>;
  languages?: Maybe<Array<Maybe<Language>>>;
  lastAirDate?: Maybe<Scalars['DateTime']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  numberOfEpisodes?: Maybe<Scalars['Int']['output']>;
  numberOfSeasons?: Maybe<Scalars['Int']['output']>;
  originCountry?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  originalName?: Maybe<Scalars['String']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Float']['output']>;
  seasonCount?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  tagline?: Maybe<Scalars['String']['output']>;
  tmdbId?: Maybe<Scalars['ID']['output']>;
  tvSeason?: Maybe<Array<Maybe<Season>>>;
  type?: Maybe<Scalars['String']['output']>;
  voteAverage?: Maybe<Scalars['Float']['output']>;
  voteCount?: Maybe<Scalars['Int']['output']>;
};

export type TvInput = {
  companies?: InputMaybe<Array<InputMaybe<ProductionCompanyInput>>>;
  countryIds?: InputMaybe<Array<Scalars['String']['input']>>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  credits?: InputMaybe<Array<InputMaybe<CreditInput>>>;
  episodeRunTime: Scalars['Float']['input'];
  firstAirDate: Scalars['DateTime']['input'];
  genres?: InputMaybe<Array<InputMaybe<GenreInput>>>;
  inProduction: Scalars['Boolean']['input'];
  languageIds?: InputMaybe<Array<Scalars['String']['input']>>;
  lastAirDate: Scalars['DateTime']['input'];
  name: Scalars['String']['input'];
  numberOfEpisodes: Scalars['Int']['input'];
  numberOfSeasons: Scalars['Int']['input'];
  originCountry: Array<InputMaybe<Scalars['String']['input']>>;
  originalName: Scalars['String']['input'];
  overview?: InputMaybe<Scalars['String']['input']>;
  popularity?: InputMaybe<Scalars['Float']['input']>;
  seasons?: InputMaybe<Array<InputMaybe<SeasonInput>>>;
  status?: InputMaybe<Scalars['String']['input']>;
  tagline?: InputMaybe<Scalars['String']['input']>;
  tmdbId?: InputMaybe<Scalars['ID']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  voteAverage?: InputMaybe<Scalars['Float']['input']>;
  voteCount?: InputMaybe<Scalars['Int']['input']>;
};

export enum TvSeriesCategory {
  AiringToday = 'AIRING_TODAY',
  TopRated = 'TOP_RATED',
  Trending = 'TRENDING',
  WhatsPopular = 'WHATS_POPULAR'
}

export type TvUpdateInput = {
  companies?: InputMaybe<Array<InputMaybe<ProductionCompanyInput>>>;
  countryIds?: InputMaybe<Array<Scalars['String']['input']>>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  credits?: InputMaybe<Array<InputMaybe<CreditInput>>>;
  episodeRunTime?: InputMaybe<Scalars['Float']['input']>;
  firstAirDate?: InputMaybe<Scalars['DateTime']['input']>;
  genres?: InputMaybe<Array<InputMaybe<GenreInput>>>;
  inProduction?: InputMaybe<Scalars['Boolean']['input']>;
  languageIds?: InputMaybe<Array<Scalars['String']['input']>>;
  lastAirDate?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  numberOfEpisodes?: InputMaybe<Scalars['Int']['input']>;
  numberOfSeasons?: InputMaybe<Scalars['Int']['input']>;
  originCountry?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  originalName: Scalars['String']['input'];
  overview?: InputMaybe<Scalars['String']['input']>;
  popularity?: InputMaybe<Scalars['Float']['input']>;
  seasons?: InputMaybe<Array<InputMaybe<SeasonInput>>>;
  status?: InputMaybe<Scalars['String']['input']>;
  tagline?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  voteAverage?: InputMaybe<Scalars['Float']['input']>;
  voteCount?: InputMaybe<Scalars['Int']['input']>;
};

export type TvsResponseList = {
  __typename?: 'TvsResponseList';
  count?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<Maybe<Tv>>>;
  message?: Maybe<Scalars['String']['output']>;
};

export type UpdateAccountResponse = {
  __typename?: 'UpdateAccountResponse';
  link?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type UpdateCurrentUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  profileImage?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCurrentUserResponse = {
  __typename?: 'UpdateCurrentUserResponse';
  data?: Maybe<User>;
  message?: Maybe<Scalars['String']['output']>;
};

export type UpdateDeleteCollectionResponse = {
  __typename?: 'UpdateDeleteCollectionResponse';
  message: Scalars['String']['output'];
};

export type UpdateMovieInput = {
  adult: Scalars['Boolean']['input'];
  budget: Scalars['Int']['input'];
  collections?: InputMaybe<Array<InputMaybe<CollectionInputData>>>;
  companies?: InputMaybe<Array<InputMaybe<ProductionCompanyInput>>>;
  countryIds?: InputMaybe<Array<Scalars['String']['input']>>;
  credits?: InputMaybe<Array<InputMaybe<CreditInput>>>;
  genres?: InputMaybe<Array<InputMaybe<GenreInput>>>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  languageIds?: InputMaybe<Array<Scalars['String']['input']>>;
  originalLanguage: Scalars['String']['input'];
  originalTitle: Scalars['String']['input'];
  overview: Scalars['String']['input'];
  releaseDate: Scalars['Date']['input'];
  revenue: Scalars['Int']['input'];
  runtime: Scalars['Int']['input'];
  status: Scalars['String']['input'];
  tagline: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type UpdatePersonInput = {
  adult?: InputMaybe<Scalars['Boolean']['input']>;
  alsoKnownAs?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  biography?: InputMaybe<Scalars['String']['input']>;
  birthday?: InputMaybe<Scalars['DateTime']['input']>;
  deathday?: InputMaybe<Scalars['DateTime']['input']>;
  gender?: InputMaybe<GenderType>;
  homePage?: InputMaybe<Scalars['String']['input']>;
  knownForDepartment?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  placeOfBirth?: InputMaybe<Scalars['String']['input']>;
  popularity?: InputMaybe<Scalars['Float']['input']>;
  profilePath?: InputMaybe<Scalars['String']['input']>;
  tmdbId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTvEpisodeResponse = {
  __typename?: 'UpdateTvEpisodeResponse';
  data?: Maybe<Episode>;
  message?: Maybe<Scalars['String']['output']>;
};

export type UpdateTvSeasonResponse = {
  __typename?: 'UpdateTvSeasonResponse';
  data?: Maybe<Season>;
  message?: Maybe<Scalars['String']['output']>;
};

export type UpdteEpisodeInput = {
  airDate?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  overview?: InputMaybe<Scalars['String']['input']>;
  seasonNumber?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdteSeasonInput = {
  airDate?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  overview?: InputMaybe<Scalars['String']['input']>;
  seasonNumber?: InputMaybe<Scalars['Int']['input']>;
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  profileImage?: Maybe<Scalars['String']['output']>;
};

export type VerifyAccountResponse = {
  __typename?: 'VerifyAccountResponse';
  token?: Maybe<Scalars['String']['output']>;
};

export type VerifyLoginOtpData = {
  __typename?: 'VerifyLoginOtpData';
  refreshToken?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type VerifyLoginOtpInput = {
  email: Scalars['String']['input'];
  otp: Scalars['Int']['input'];
};

export type VerifyLoginOtpResponse = {
  __typename?: 'VerifyLoginOtpResponse';
  data?: Maybe<VerifyLoginOtpData>;
  message?: Maybe<Scalars['String']['output']>;
};

export type Video = {
  __typename?: 'Video';
  countryCode?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  languageCode?: Maybe<Scalars['String']['output']>;
  mediaId?: Maybe<Scalars['ID']['output']>;
  mediaType?: Maybe<MediaType>;
  official?: Maybe<Scalars['Boolean']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  site?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['Int']['output']>;
};

export type WatchList = {
  __typename?: 'WatchList';
  accountId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  movie?: Maybe<Movie>;
  reference?: Maybe<Reference>;
  referenceId?: Maybe<Scalars['String']['output']>;
  tv?: Maybe<Tv>;
};

export type CollectionData = {
  __typename?: 'collectionData';
  backdropPath?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  posterPath?: Maybe<Scalars['String']['output']>;
  tmdbId?: Maybe<Scalars['Int']['output']>;
};

export type CollectionDataToUpdate = {
  backdropData?: InputMaybe<ImageUpdateData>;
  moviesToAdd?: InputMaybe<Array<Scalars['ID']['input']>>;
  moviesToRemove?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  overview?: InputMaybe<Scalars['String']['input']>;
  posterData?: InputMaybe<ImageUpdateData>;
};

export type CollectionInputData = {
  backdropData?: InputMaybe<ImageData>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  overview: Scalars['String']['input'];
  posterData?: InputMaybe<ImageData>;
  tmdbId: Scalars['Int']['input'];
};

export type DeleteFavoriteMovieResponse = {
  __typename?: 'deleteFavoriteMovieResponse';
  message?: Maybe<Scalars['String']['output']>;
};

export type DeleteMovieRatingResponse = {
  __typename?: 'deleteMovieRatingResponse';
  message?: Maybe<Scalars['String']['output']>;
};

export type DeletePersonResponse = {
  __typename?: 'deletePersonResponse';
  message?: Maybe<Scalars['String']['output']>;
};

export type DeleteWatchListMovieResponse = {
  __typename?: 'deleteWatchListMovieResponse';
  message?: Maybe<Scalars['String']['output']>;
};

export type FavoriteMovieInput = {
  reference?: InputMaybe<Reference>;
  referenceId?: InputMaybe<Scalars['String']['input']>;
};

export type FavoriteMovieResponse = {
  __typename?: 'favoriteMovieResponse';
  favorite?: Maybe<Array<Maybe<Favorite>>>;
  message: Scalars['String']['output'];
};

export type GenreData = {
  __typename?: 'genreData';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type GetCastCrewResponse = {
  __typename?: 'getCastCrewResponse';
  count?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<Maybe<Credits>>>;
};

export type GetPersonMovieResponse = {
  __typename?: 'getPersonMovieResponse';
  count?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<Maybe<Movie>>>;
};

export type ImageData = {
  aspectRatio: Scalars['Float']['input'];
  filePath: Scalars['String']['input'];
  height: Scalars['Int']['input'];
  languageCode: Scalars['String']['input'];
  width: Scalars['Int']['input'];
};

export type ImageUpdateData = {
  aspectRatio?: InputMaybe<Scalars['Float']['input']>;
  filePath?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  languageCode?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

export type MovieData = {
  __typename?: 'movieData';
  adult?: Maybe<Scalars['Boolean']['output']>;
  backdropPath?: Maybe<Array<Maybe<Scalars['ID']['output']>>>;
  budget?: Maybe<Scalars['Int']['output']>;
  genreIds?: Maybe<Array<Maybe<Scalars['ID']['output']>>>;
  homePage?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  originalLanguage?: Maybe<Scalars['String']['output']>;
  originalTitle?: Maybe<Scalars['String']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  popularity?: Maybe<Scalars['Float']['output']>;
  posterPath?: Maybe<Array<Maybe<Scalars['ID']['output']>>>;
  releaseDate?: Maybe<Scalars['String']['output']>;
  revenue?: Maybe<Scalars['Int']['output']>;
  runtime?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  tagline?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  video?: Maybe<Scalars['Boolean']['output']>;
  voteAverage?: Maybe<Scalars['Float']['output']>;
  voteCount?: Maybe<Scalars['Int']['output']>;
};

export type MovieRatingResponse = {
  __typename?: 'movieRatingResponse';
  message: Scalars['String']['output'];
  rating?: Maybe<Rating>;
};

export type WatchListMovieInput = {
  reference?: InputMaybe<Reference>;
  referenceId?: InputMaybe<Scalars['String']['input']>;
};

export type WatchListMovieResponse = {
  __typename?: 'watchListMovieResponse';
  message: Scalars['String']['output'];
  watchList?: Maybe<WatchList>;
};

export type DeleteMovieMutationVariables = Exact<{
  deleteMovieId: Scalars['ID']['input'];
}>;


export type DeleteMovieMutation = { __typename?: 'Mutation', deleteMovie?: { __typename?: 'MovieSuccessResponse', data?: { __typename?: 'Data', movie?: { __typename?: 'Movie', id?: string | null, title?: string | null } | null } | null } | null };

export type MutationMutationVariables = Exact<{
  data?: InputMaybe<MovieInput>;
}>;


export type MutationMutation = { __typename?: 'Mutation', createMovie?: { __typename?: 'MovieSuccessResponse', data?: { __typename?: 'Data', movie?: { __typename?: 'Movie', title?: string | null, releaseDate?: any | null } | null } | null } | null };

export type UpdateMovieMutationVariables = Exact<{
  updateMovieId: Scalars['ID']['input'];
  data?: InputMaybe<UpdateMovieInput>;
}>;


export type UpdateMovieMutation = { __typename?: 'Mutation', updateMovie?: { __typename?: 'MovieSuccessResponse', message?: string | null } | null };

export type DeletePersonMutationVariables = Exact<{
  deletePersonId: Scalars['ID']['input'];
}>;


export type DeletePersonMutation = { __typename?: 'Mutation', deletePerson?: { __typename?: 'deletePersonResponse', message?: string | null } | null };

export type UpdatePersonMutationVariables = Exact<{
  updatePersonId: Scalars['ID']['input'];
  data: UpdatePersonInput;
}>;


export type UpdatePersonMutation = { __typename?: 'Mutation', updatePerson?: { __typename?: 'CreatePersonResponse', data?: { __typename?: 'Person', id?: string | null, alsoKnownAs?: Array<string | null> | null, biography?: string | null, gender?: GenderType | null, birthday?: any | null, name?: string | null, placeOfBirth?: string | null, popularity?: number | null, knownForDepartment?: string | null, adult?: boolean | null } | null } | null };

export type CreatePersonMutationVariables = Exact<{
  data: PersonInput;
}>;


export type CreatePersonMutation = { __typename?: 'Mutation', createPerson?: { __typename?: 'CreatePersonResponse', data?: { __typename?: 'Person', adult?: boolean | null, birthday?: any | null, gender?: GenderType | null, name?: string | null, placeOfBirth?: string | null, popularity?: number | null } | null } | null };

export type EmailPasswordLogInMutationVariables = Exact<{
  data: EmailPasswordLogInData;
}>;


export type EmailPasswordLogInMutation = { __typename?: 'Mutation', emailPasswordLogIn?: { __typename?: 'EmailPasswordLogInResponse', data?: { __typename?: 'EmailPasswordLogInResponseData', token?: string | null, refreshToken?: string | null, user?: { __typename?: 'User', id?: string | null, email?: string | null, name?: string | null } | null } | null } | null };

export type MoviesQueryVariables = Exact<{
  filter: MoviesFilter;
  sort: ListMoviesSort;
}>;


export type MoviesQuery = { __typename?: 'Query', movies?: { __typename?: 'MoviesResponseList', data?: Array<{ __typename?: 'Movie', id?: string | null, title?: string | null, imageUrl?: string | null, releaseDate?: any | null } | null> | null } | null };

export type MovieQueryVariables = Exact<{
  movieId: Scalars['ID']['input'];
}>;


export type MovieQuery = { __typename?: 'Query', movie?: { __typename?: 'MovieResponse', data?: { __typename?: 'Movie', title?: string | null, imageUrl?: string | null, revenue?: number | null, releaseDate?: any | null, adult?: boolean | null, budget?: number | null, originalTitle?: string | null, runtime?: number | null, status?: string | null, tagline?: string | null, originalLanguage?: string | null, overview?: string | null, genres?: Array<{ __typename?: 'Genre', id?: string | null, name?: string | null } | null> | null } | null } | null };

export type LanguagesQueryVariables = Exact<{
  filter?: InputMaybe<LanguagesFilter>;
}>;


export type LanguagesQuery = { __typename?: 'Query', languages?: { __typename?: 'LanguagesResponse', data?: Array<{ __typename?: 'Language', id?: string | null, englishName?: string | null, languageCode?: string | null } | null> | null } | null };

export type ListPersonsQueryVariables = Exact<{
  filter: ListPersonsFilter;
  sort: ListPersonsSort;
}>;


export type ListPersonsQuery = { __typename?: 'Query', listPersons?: { __typename?: 'PersonsResponseList', count?: number | null, data?: Array<{ __typename?: 'Person', id?: string | null, name?: string | null, gender?: GenderType | null, adult?: boolean | null, birthday?: any | null, popularity?: number | null, placeOfBirth?: string | null, alsoKnownAs?: Array<string | null> | null, biography?: string | null, knownForDepartment?: string | null, profilePath?: string | null } | null> | null } | null };

export type GetPersonListQueryVariables = Exact<{
  filter: ListPersonsFilter;
  sort: ListPersonsSort;
}>;


export type GetPersonListQuery = { __typename?: 'Query', listPersons?: { __typename?: 'PersonsResponseList', data?: Array<{ __typename?: 'Person', id?: string | null, name?: string | null, gender?: GenderType | null, adult?: boolean | null, birthday?: any | null, popularity?: number | null, placeOfBirth?: string | null, alsoKnownAs?: Array<string | null> | null, biography?: string | null, knownForDepartment?: string | null } | null> | null } | null };

export type GetPersonQueryVariables = Exact<{
  personId: Scalars['ID']['input'];
}>;


export type GetPersonQuery = { __typename?: 'Query', person?: { __typename?: 'PersonResponse', data?: { __typename?: 'Person', id?: string | null, name?: string | null, placeOfBirth?: string | null, popularity?: number | null, adult?: boolean | null, biography?: string | null, birthday?: any | null, gender?: GenderType | null, knownForDepartment?: string | null, alsoKnownAs?: Array<string | null> | null } | null } | null };

export type MovieTitleQueryVariables = Exact<{
  movieId: Scalars['ID']['input'];
}>;


export type MovieTitleQuery = { __typename?: 'Query', movie?: { __typename?: 'MovieResponse', data?: { __typename?: 'Movie', title?: string | null } | null } | null };


export const DeleteMovieDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMovie"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteMovieId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMovie"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteMovieId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"movie"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]}}]} as unknown as DocumentNode<DeleteMovieMutation, DeleteMovieMutationVariables>;
export const MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Mutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"MovieInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMovie"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"movie"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"releaseDate"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MutationMutation, MutationMutationVariables>;
export const UpdateMovieDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMovie"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateMovieId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateMovieInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMovie"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateMovieId"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<UpdateMovieMutation, UpdateMovieMutationVariables>;
export const DeletePersonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePerson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deletePersonId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePerson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deletePersonId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeletePersonMutation, DeletePersonMutationVariables>;
export const UpdatePersonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePerson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updatePersonId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePersonInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePerson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updatePersonId"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"alsoKnownAs"}},{"kind":"Field","name":{"kind":"Name","value":"biography"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"placeOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"popularity"}},{"kind":"Field","name":{"kind":"Name","value":"knownForDepartment"}},{"kind":"Field","name":{"kind":"Name","value":"adult"}}]}}]}}]}}]} as unknown as DocumentNode<UpdatePersonMutation, UpdatePersonMutationVariables>;
export const CreatePersonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePerson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PersonInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPerson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adult"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"placeOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"popularity"}}]}}]}}]}}]} as unknown as DocumentNode<CreatePersonMutation, CreatePersonMutationVariables>;
export const EmailPasswordLogInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EmailPasswordLogIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EmailPasswordLogInData"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"emailPasswordLogIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<EmailPasswordLogInMutation, EmailPasswordLogInMutationVariables>;
export const MoviesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Movies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MoviesFilter"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListMoviesSort"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"movies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"releaseDate"}}]}}]}}]}}]} as unknown as DocumentNode<MoviesQuery, MoviesQueryVariables>;
export const MovieDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Movie"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"movieId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"movie"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"movieId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"revenue"}},{"kind":"Field","name":{"kind":"Name","value":"releaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"adult"}},{"kind":"Field","name":{"kind":"Name","value":"budget"}},{"kind":"Field","name":{"kind":"Name","value":"originalTitle"}},{"kind":"Field","name":{"kind":"Name","value":"runtime"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"tagline"}},{"kind":"Field","name":{"kind":"Name","value":"originalLanguage"}},{"kind":"Field","name":{"kind":"Name","value":"overview"}},{"kind":"Field","name":{"kind":"Name","value":"genres"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MovieQuery, MovieQueryVariables>;
export const LanguagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Languages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"LanguagesFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"languages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"englishName"}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}}]}}]}}]}}]} as unknown as DocumentNode<LanguagesQuery, LanguagesQueryVariables>;
export const ListPersonsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListPersons"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListPersonsFilter"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListPersonsSort"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listPersons"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"adult"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"popularity"}},{"kind":"Field","name":{"kind":"Name","value":"placeOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"alsoKnownAs"}},{"kind":"Field","name":{"kind":"Name","value":"biography"}},{"kind":"Field","name":{"kind":"Name","value":"knownForDepartment"}},{"kind":"Field","name":{"kind":"Name","value":"profilePath"}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<ListPersonsQuery, ListPersonsQueryVariables>;
export const GetPersonListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPersonList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListPersonsFilter"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListPersonsSort"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listPersons"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"adult"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"popularity"}},{"kind":"Field","name":{"kind":"Name","value":"placeOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"alsoKnownAs"}},{"kind":"Field","name":{"kind":"Name","value":"biography"}},{"kind":"Field","name":{"kind":"Name","value":"knownForDepartment"}}]}}]}}]}}]} as unknown as DocumentNode<GetPersonListQuery, GetPersonListQueryVariables>;
export const GetPersonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPerson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"personId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"person"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"personId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"placeOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"popularity"}},{"kind":"Field","name":{"kind":"Name","value":"adult"}},{"kind":"Field","name":{"kind":"Name","value":"biography"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"knownForDepartment"}},{"kind":"Field","name":{"kind":"Name","value":"alsoKnownAs"}}]}}]}}]}}]} as unknown as DocumentNode<GetPersonQuery, GetPersonQueryVariables>;
export const MovieTitleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MovieTitle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"movieId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"movie"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"movieId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<MovieTitleQuery, MovieTitleQueryVariables>;