import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectArticlesList } from 'src/app/state/articles/reducer/selectors';

import { ArticlesSateInterface } from 'src/app/state/articles/interface/articles-store-interface';
import { Article } from 'src/assets/interfaces/article-interface';

import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';

import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport)
  viewport!: CdkVirtualScrollViewport;

  articles$: Observable<Article[]>;
  pagedArticles$: Observable<Article[]>;
  dataSource: MatTableDataSource<Article>;
  virtualScroll = false;

  maxCharacters = 250;
  pageSize = 10;
  batchSize = 5;

  articlesSubscription: Subscription = new Subscription();
  
  constructor(private store: Store<ArticlesSateInterface>) {
    this.articles$ = this.store.pipe(select(selectArticlesList));
    this.pagedArticles$ = this.store.pipe(select(selectArticlesList));
    this.dataSource = new MatTableDataSource<Article>();
  }

  ngOnInit() {
    this.articlesSubscription = this.articles$.subscribe((articles) => {
      this.dataSource.data = articles;
    });
    this.onPageChange({ pageIndex: 0, pageSize: this.pageSize, length: this.dataSource.data.length });
  }

  onPageChange(event: PageEvent) {
    const { length, pageIndex, pageSize } = event;
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;

    this.pagedArticles$ = this.store.pipe(
      select(selectArticlesList),
      map((articles) => articles.slice(startIndex, endIndex))
    );

    if (length === pageSize) {
      this.virtualScroll = true;
    } else {
      this.virtualScroll = false;
    }


  }

  loadMore(event: any) {
    const end = this.viewport.getRenderedRange().end;
    if (end === this.viewport.getDataLength() && this.batchSize < this.viewport.getDataLength()) {
      this.batchSize += 5;
      this.pagedArticles$ = this.store.pipe(
        select(selectArticlesList),
        map((articles) => articles.slice(0, this.batchSize))
      );
    }
  }

  deleteArticle(id: number) {
    this.store.dispatch({ type: '[Articles] Delete Article', id });
  }

  onImageError(event: any) {
    event.target.src = 'https://via.placeholder.com/150';
  }

  ngOnDestroy() {
    this.articlesSubscription.unsubscribe();
  }
}
