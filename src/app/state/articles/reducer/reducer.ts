import { createReducer, on } from "@ngrx/store";

import { ArticlesState } from "../interface/articles-store-interface";

import * as ArticlesActions from "./actions";

import { collection } from "src/assets/articles/articles-collection";

export const initialState: ArticlesState = {
  articles: [...collection],
  isLoading: false,
  loaded: false,
  error: null
};

export const articleReducers = createReducer(
  initialState,
  on(ArticlesActions.loadArticles, (state) => ({ ...state, isLoading: true })),
  on(ArticlesActions.setArticles, (state, { articles }) => ({ ...state, articles, isLoading: false, loaded: true })),
  on(ArticlesActions.deleteArticle, (state, { id }) => ({ ...state, articles: state.articles.filter(article => article.id !== id) })),
  on(ArticlesActions.addArticle, (state, { article }) => ({ ...state, articles: [...state.articles, article] })),
  on(ArticlesActions.sortArticlesByTagAlfabetically, (state, { tag }) => ({ ...state, articles: state.articles.sort((a, b) => a.tags[0].localeCompare(b.tags[0])) })),
  on(ArticlesActions.sortArticlesByTagReverseAlfabetically, (state, { tag }) => ({ ...state, articles: state.articles.sort((a, b) => b.tags[0].localeCompare(a.tags[0])) })),
  on(ArticlesActions.findArticlesByTitle, (state, { title }) => ({ ...state, articles: state.articles.filter(article => article.title.toLowerCase().includes(title.toLowerCase())) })),
  on(ArticlesActions.setDefaultArticles, (state, { articles }) => ({ ...state, articles })),
);
