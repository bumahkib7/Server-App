import {Component, OnInit} from '@angular/core';
import {ServerService} from "./service/server.service";
import {map, Observable, of, startWith} from "rxjs";
import {CustomResponse} from './interface/custom-response';
import {AppState} from "./interface/app-state";
import {DataState} from "./enum/data-state";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private serverService: ServerService) {
  }

  appState$: Observable<AppState<CustomResponse>>;

  ngOnInit(): void {
    this.appState$ = this.serverService.servers$
      .pipe(
        map(response => {
          return {
            dataState: DataState.LOADED_STATE, appData: response
          }
        }),

        startWith({dataState: DataState.LOADING_STATE}),
        catchError((error: string) => {
          return of({dataState: DataState.ERROR_STATE, error})
        })
      );
  }
}


// Language: typescript


