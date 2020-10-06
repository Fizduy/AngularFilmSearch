import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {SearchService, FilmInfo} from '../search.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

  data : FilmInfo;

  constructor(private route: ActivatedRoute, private searchService: SearchService) { }

  ngOnInit(): void {
    let id : string;
    this.route.paramMap.subscribe(params => {
      id = params.get('imdbID');
      this.searchService.getDescription(id).subscribe((data: FilmInfo) => this.data = data);
    });
  }

}
