import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
// import {
//   //geoEqualEarth, Proyeccion de la tierra.
//   geoPath,
//   geoMercator
// } from "d3-geo";
// import { feature } from "topojson-client";
import * as d3 from 'd3';
import * as t from 'topojson';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  // geographies: any;
  // cities: any;
  // projection = geoMercator()
  // .scale(160)
  // .translate([800 / 2, 650 / 2]);
  constructor(private http: HttpClient) { }
  ngAfterViewInit(): void {
    
  }

  ngOnInit() {
    // let projection = d3.geoMercator();
    // this.http.get("../../assets/world.json").subscribe((res) => {
    //   this.geographies = feature(res, res['objects'].countries).features;
    // })
    // this.http.get("../../assets/cities.json").subscribe((res) => {
    //   this.cities = res;
    // })
    document.getElementById('box').style.display = 'none';
    let width = '100%';
    let height = 600;

    let projection = d3.geoMercator();

    let svg = d3.select('#svg-map').append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('stroke', '#FFFFFF')
      .attr('strokeWidth', 0.5)
      .attr('fill', 'gray');
    let path = d3.geoPath()
      .projection(projection);
    let g = svg.append('g');
    g.attr('class', 'map');

    console.log("outside json calling1");

    svg.append("svg:defs").append("svg:marker")
    .attr("id", "triangle")
    .attr("refX", 13)
    .attr("refY", 5)
    .attr("markerWidth", 30)
    .attr("markerHeight", 30)
    .attr("markerUnits","userSpaceOnUse")
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 12 6 0 12 3 6")
    .style("fill", "#555");
    d3.json("../../assets/world-110m2.json")
      .then(function (topology) {
        console.log("------>", topology.feature);
        g.selectAll('path')
          .data(t.feature(topology, topology.objects.countries).features)
          .enter()
          .append('path')
          .attr('d', path);
      });

      // const pj = d3.geoMercator()
      // .scale(160)
      // .translate([800 / 2, 650 / 2]);
    d3.json("../../assets/cities-new.json")
      .then(function (topology) {
        console.log("------>", topology.features);
        for (var j = 0; j < topology.features.length; j++) {
		
          // check if has value and draw line
          if (topology.features[j].geometry.properties.value > 0) {
            
            // var v = topology.features[j].geometry.properties.value;
            // var vSize = d3.scale.linear()
            //       .domain([0,25])
            //       .range([0.5,8]);
            // var vOp = d3.scale.linear()
            //       .domain([0,25])
            //       .range([0.25,0.75]);
            
            // Random colour
            var randColour = ['#31558d', '#c52b2d'][Math.floor(Math.random() * 2)];			
            
            var x = projection(topology.features[j].geometry.coordinates)[0],
              y = projection(topology.features[j].geometry.coordinates)[1];
            
            var marker = svg.append("svg:path")
              .attr("class", "marker")
              .attr("d", "M0,0l-8.8-17.7C-12.1-24.3-7.4-32,0-32h0c7.4,0,12.1,7.7,8.8,14.3L0,0z")
              .attr("transform", "translate(" + x + "," + y + ") scale(0)")
              .transition()
              .delay(400)
              .duration(800)
              .attr('fill', '#E91E63')
              .attr('stroke', '#FFFFFF')
              .attr("transform", "translate(" + x + "," + y + ") scale(.75)")
              ;
            
              Array.from(document.getElementsByClassName('marker')).forEach(function(element) {
                element.addEventListener('click', (e) => {
                  var s= document.getElementById('box') as HTMLElement;
                  s.style.display = 'block';
                  s.style.position = 'absolute';
                  s.style.top = e['clientY'] +'px';
                  s.style.left = e['clientX'] + 50 + 'px';

                  console.log(e);
                  console.log(s);
                  // .attr("transform", "translate(" + x + "," + y + ") scale(.75)")
                });
                element.addEventListener('mouseenter', (e) => {
                  var s= document.getElementById('box') as HTMLElement;
                  s.style.display = 'block';
                  s.style.position = 'absolute';
                  s.style.top = e['clientY'] +'px';
                  s.style.left = e['clientX'] + 50 + 'px';

                  console.log(e);
                  console.log(s);
                  // d3.select(this)
                  // .transition()
                  // .delay(400)
                  // .duration(800)
                  // .attr('fill', 'yellow')
                  // .attr('stroke', '#FFFFFF')
                  // .attr("transform", "translate(" + d['x'] + "," + d['y'] + ") scale(2)");
                  // .attr("transform", "translate(" + x + "," + y + ") scale(.75)")
                });
                element.addEventListener('mouseleave', (d) => {
                  var s= document.getElementById('box') as HTMLElement;
    s.style.display = 'none';
                  // .attr("transform", "translate(" + x + "," + y + ") scale(.75)")
                });
              });
      //         marker.selectAll("path")
			// .on("click", function(d) {
			// 	d3.select(this)
			// 		.transition()
			// 		.duration(200)
			// 		// .ease("elastic")
			// 		.attr("transform", "translate(" + d.x + "," + d.y + ") scale(2)");
			// });
            // var cc = topology.features[j].geometry.properties.countryCode;
            
            // svg.append("svg:text")
            //   .attr("x", x)
            //   .attr("y", y)
            //   .attr("dx", ".5em")
            //   .attr("dy", ".35em")
            //   .text(cc)
            //   .attr("class", "cc");
          }
        }
      });
  }
}
