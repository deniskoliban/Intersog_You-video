import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { YoutubeService } from './services/youtube.service';
import { reverse } from 'lodash';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  gapi = (<any>window).gapi;
  items = [];
  currentDate: string;

  constructor(private cr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.gapi.load('client');
    setTimeout(this.loadClient, 150);
    this.getCurrentDate();
  }

  getCurrentDate() {
    let today = new Date();
    let dd = String(today.getDate());
    let mm = String(today.getMonth() + 1);
    let yyyy = today.getFullYear();

    this.currentDate = yyyy + '-' + mm + '-' + dd + 'T00:00:00Z';
    console.log(this.currentDate);
   
  }

  loadClient() {
    this.gapi.client.setApiKey("AIzaSyAsmy0Rb5lh0tPeCjam7JtQH4quhvmqIH4");
    return this.gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest");
  }

  execute() {
    
    return this.gapi.client.youtube.search.list({
      "part": "snippet",
      "maxResults": 15,
      "q": "javascript|python -basics",
      "order": "date",
      "publishedAfter": "2019-08-04T00:00:00Z",
      "publishedBefore": this.currentDate
    })
      .then((response) => {
        console.log(response);
        this.items = reverse(response.result.items);
        console.log(response.result.items);
        this.cr.detectChanges();
      }, (err) => { console.error("Execute error", err); });
  }
}
