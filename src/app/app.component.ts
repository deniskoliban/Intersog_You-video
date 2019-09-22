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
  

  constructor(private cr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.gapi.load('client');
    setTimeout(this.loadClient, 150);
    
  }

 
  loadClient() {
    this.gapi.client.setApiKey("AIzaSyAsmy0Rb5lh0tPeCjam7JtQH4quhvmqIH4");
    return this.gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest");
  }

  sortfunction(a, b) {
    let dateA = new Date(a.snippet.publishedAt).getTime();
    let dateB = new Date(b.snippet.publishedAt).getTime();
    return dateA - dateB
  }

  execute() {
    
    return this.gapi.client.youtube.search.list({
      "part": "snippet",
      "maxResults": 15,
      "q": "javascript|python -basics",
      "publishedAfter": "2019-08-04T00:00:00Z"
      
    })
      .then((response) => {
        this.items = reverse(response.result.items);
        this.items.sort(this.sortfunction);
        this.cr.detectChanges();
      }, (err) => { console.error("Execute error", err); });
  }
}
