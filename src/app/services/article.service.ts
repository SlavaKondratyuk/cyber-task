import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectArticlesList } from 'src/app/state/articles/reducer/selectors';

import { collection } from '../../assets/articles/articles-collection';
import { ArticlesSateInterface } from '../state/articles/interface/articles-store-interface';
import { Article } from '../../assets/interfaces/article-interface';

import * as ArticlesActions from '../state/articles/reducer/actions';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private store: Store<ArticlesSateInterface>) { }


  setArticles(): void {
    this.store.dispatch(ArticlesActions.setArticles( collection ));
  }

  findArticlesByTitle(title: string): void {
    this.setArticles();
    this.store.dispatch({ type: '[Articles] Filter Articles', title });
  }

  getUniqueTags(): string[] {
    let uniqueTagsSet = new Set<string>();
    this.store.pipe(select(selectArticlesList)).subscribe((articles) => {
      articles.forEach(article => {
        article.tags.forEach(tag => {
          uniqueTagsSet.add(tag);
        });
      });
    });
    return Array.from(uniqueTagsSet);
  }

  getArticlesByTag(tag: string, arrayOfArticles: Article[]): Article[] {
    return arrayOfArticles.filter(article => article.tags.includes(tag));
  }

  private getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  private generateRandomArticle(): Article {
    const randomId: number = this.getRandomInt(1, 1000);
    const randomTitle: string = `Title ${randomId}`;
    const randomCover: string = `https://placekitten.com/200/300?random=${randomId}`;
    const randomContent: string = `Content for article ${randomId}`;
    const randomAuthor: string = `Author ${this.getRandomInt(1, 10)}`;
    const randomTagCount: number = this.getRandomInt(1, 5);
    const randomTags: string[] = Array.from({ length: randomTagCount }, () => `Tag ${this.getRandomInt(1, 20)}`);
  
    return {
      id: randomId,
      title: randomTitle,
      cover: randomCover,
      content: randomContent,
      author: randomAuthor,
      tags: randomTags,
    };
  }
  
  addNewArticle(): void {
    const newArticle = this.generateRandomArticle();
    this.store.dispatch(ArticlesActions.addArticle(newArticle));
  }

}
