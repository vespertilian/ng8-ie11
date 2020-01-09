import { Component, ElementRef, HostBinding, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { loadModules, loadScript } from 'esri-loader';

@Component({
  selector: 'app-two',
  templateUrl: './two.component.html',
  styleUrls: ['./two.component.scss']
})
export class TwoComponent implements OnInit, OnDestroy {

  @HostBinding('class') class = 'eim-widget eim-widget_full';
  @ViewChild('mapViewNode', {static: true}) mapViewEl: ElementRef;
  view: any;

  constructor(private ngZone: NgZone) {
  }

  initializeMap() {
    this.ngZone.runOutsideAngular( () => {
      loadScript({ version: '4.12' })
        .then(() => loadModules( [ 'esri/views/MapView', 'esri/WebMap' ] ))
        .then(([EsriMapView, EsriWebMap]) => {
          console.log('loaded esri');

          const webMap = new EsriWebMap({});
          this.view = new EsriMapView({
            map: webMap,
            container: this.mapViewEl.nativeElement
          });
        });
    });
  }

  ngOnInit() {
    this.initializeMap();
  }

  ngOnDestroy() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }
}
