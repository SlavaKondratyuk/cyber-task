import { Article } from '../../../../assets/interfaces/article-interface';

export interface ArticlesState {
    articles: Article[] | [];
    isLoading: boolean;
    loaded: boolean;
    error: string | null;
}

export interface ArticlesSateInterface {
    articles: ArticlesState;
}
