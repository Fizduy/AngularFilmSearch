import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {SearchService, FilmList} from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private searchService: SearchService) { }

  options : FilmList['Search'] = [];
  myControl = new FormControl();

  filteredOptions: Observable<FilmList['Search']>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): FilmList['Search'] {
    const filterValue = value.toLowerCase();
    if(filterValue.length > 4){
      this.getItems(filterValue);
    } else {
      this.options = [];
    }
    return this.options.slice(0,5);
  }

  private getItems(value: string) {
    this.searchService.getItems(value)
      .subscribe((data: FilmList) => this.options = (data['Response'] === 'True') ? data['Search'] : []);
  }
}
