import { createSelector } from "@ngrx/store";
import { ArticlesSateInterface } from "../interface/articles-store-interface";

export const selectArticles = (state: ArticlesSateInterface) => state.articles.articles;

export const selectArticlesList = createSelector(
    selectArticles,
    (state) => state
);
