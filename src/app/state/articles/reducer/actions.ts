import { createAction } from "@ngrx/store";
import { Article } from "src/assets/interfaces/article-interface";

export const loadArticles = createAction('[Articles] Load Articles');
export const setArticles = createAction('[Articles] Load Articles Success', (articles: Article[]) => ({ articles }));
export const deleteArticle = createAction('[Articles] Delete Article', (id: number) => ({ id }));
export const addArticle = createAction('[Articles] Add Article', (article: Article) => ({ article }));
export const sortArticlesByTagAlfabetically = createAction('[Articles] Sort Articles By Tag', (tag: string) => ({ tag }));
export const sortArticlesByTagReverseAlfabetically = createAction('[Articles] Sort Articles By Tag Reverse', (tag: string) => ({ tag }));
export const findArticlesByTitle = createAction('[Articles] Filter Articles', (title: string) => ({ title }));
export const setDefaultArticles = createAction('[Articles] Set Default Articles', (articles: Article[]) => ({ articles }));

export function selectArticleList(selectArticleList: any) {
    throw new Error('Function not implemented.');
}
