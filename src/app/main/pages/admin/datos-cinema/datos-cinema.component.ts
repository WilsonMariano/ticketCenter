import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datos-cinema',
  templateUrl: './datos-cinema.component.html',
  styleUrls: ['./datos-cinema.component.scss']
})
export class DatosCinemaComponent implements OnInit {

  public title = 'Editar cinema';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const idCinema = this.route.snapshot.paramMap.get('id');
    if(idCinema === 'nuevo') {
      this.title = 'Alta de cinema';
    }
  }

}
