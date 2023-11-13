import { Component } from '@angular/core';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchQuery: string = '';

  constructor(private articleService: ArticleService) {}

  onSearch() {
    this.articleService.findArticlesByTitle(this.searchQuery);
  }

  addNewArticle() {
    this.articleService.addNewArticle();
  }
}
