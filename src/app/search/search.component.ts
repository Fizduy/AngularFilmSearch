import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import { Observable, of } from 'rxjs';
import {SearchService, FilmList} from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  options : Observable<FilmList['Search']>;
  myControl = new FormControl();

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.myControl.valueChanges.subscribe(value => {
      this.options = (value.length > 4) ? this.searchService.searchItems(value) : of(null)
    });
  }

}
