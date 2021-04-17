import { MoviesService } from './../../services/movies.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    const movies = this.moviesService.getAll().snapshotChanges().subscribe(data => console.log)

  }

}
