import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { ArticleService } from 'src/app/services/article.service';

import { ArticlesSateInterface } from 'src/app/state/articles/interface/articles-store-interface';
import { Article } from 'src/assets/interfaces/article-interface';

import { selectArticlesList } from 'src/app/state/articles/reducer/selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  articles: Article[] = [];
  sortedArticles: Article[] = [];
  uniqueTags: string[] = [];
  selectedTag: string = '';
  maxCharacters = 250;

  articlesSubscription: Subscription = new Subscription();

  constructor(private store: Store<ArticlesSateInterface>, private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articlesSubscription = this.store.pipe(select(selectArticlesList)).subscribe((articles) => {
      this.articles = articles;
      this.sortedArticles = this.articles;
      this.uniqueTags = this.articleService.getUniqueTags();
      this.resetSelectedTag();
    });
  }

  onTagSelectionChange() {
    this.sortedArticles = this.articleService.getArticlesByTag(this.selectedTag, this.articles);
  }

  resetSelectedTag() {
    this.selectedTag = '';
  }

  onImageError(event: any) {
    event.target.src = 'https://via.placeholder.com/150';
  }

  ngOnDestroy() {
    this.articlesSubscription.unsubscribe();
  }
}
