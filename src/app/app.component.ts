import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { YoutubeService } from './services/youtube.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
 
  gapi = (<any>window).gapi;
  
  globalResponse: any = {};



  ngOnInit(): void {
    this.gapi.load('client');
    
    setTimeout(this.loadClient, 150);
    
  }

  loadClient() {
    this.gapi.client.setApiKey("AIzaSyAsmy0Rb5lh0tPeCjam7JtQH4quhvmqIH4");
    return this.gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  // Make sure the client is loaded before calling this method.
  execute() {
    return this.gapi.client.youtube.search.list({
      "part": "snippet",
      "maxResults": 15,
      "q": "javascript|python -basics",
      "order": "date",
      "publishedAfter": "2019-08-04T07:55:29.000Z",
    })
        .then((response)=> {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
                this.globalResponse = response.result.items;
                console.log(this.globalResponse)
              },
              function(err) { console.error("Execute error", err); });
  }

  
 
  
}
