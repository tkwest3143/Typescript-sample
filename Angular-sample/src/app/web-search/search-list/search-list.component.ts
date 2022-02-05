import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchResult } from 'src/app/model/searchResult';
import { WebSearchService } from '../web-search.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss'],
})
export class SearchListComponent implements OnInit {
  searchResult: SearchResult[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: WebSearchService
  ) {}

  ngOnInit(): void {
    this.service
      .getSearchResult(Number(this.route.snapshot.paramMap.get('siteId')))
      .subscribe((res) => {
        this.searchResult = res;
      });
  }
}
