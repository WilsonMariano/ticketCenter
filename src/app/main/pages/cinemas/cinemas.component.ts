import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Cinema } from '../../classes/cinema.class';
import { CinemasService } from '../../services/cinemas.service';
declare var mapboxgl;

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html',
  styleUrls: ['./cinemas.component.scss']
})
export class CinemasComponent implements OnInit {

  public cinemas: Cinema[];
  public map = null;

  constructor(
    private cinemasService: CinemasService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getCinemas();
    mapboxgl.accessToken = 'pk.eyJ1IjoicGFibG84NnYiLCJhIjoiY2tvNjl6ZHJpMDlnZTJwb2ExaG50NTJsZCJ9.jPQt1xs851GdD-BkkQ_-SQ';
  }
 
  private async getCinemas() {
    this.spinner.show();
    this.cinemasService.getAll().subscribe(
      res => {
        this.cinemas = res;
        setTimeout(() => {
          this.cinemas.forEach(c => {this.setCinemaMap(c)}),
          setTimeout(() => {this.spinner.hide();}, 6000);
        }, 100)
      });
  }

  public setCinemaMap(cinema: Object){
      this.map = new mapboxgl.Map({
      container: 'map_' + cinema["id"],
      style: 'mapbox://styles/mapbox/streets-v11', 
      center: [cinema["lng"], cinema["lat"]], 
      zoom: 14 
      });

      // Create a default Marker and add it to the map.
      var marker = new mapboxgl.Marker()
        .setLngLat([cinema["lng"], cinema["lat"]])
        .addTo(this.map);
  }
}
