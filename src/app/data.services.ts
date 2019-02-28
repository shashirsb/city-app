import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { Subject } from "rxjs";


const httpOptions = {
    headers: new HttpHeaders({
        "content-type": "application/json"
    })
};

@Injectable({
    providedIn: "root"
})

export class DataService {

 
    constructor(private http: HttpClient) {
      
    }
    post(request: any, baseurl: any) {
        let url = baseurl;
        return this.http.post(url, request.params, httpOptions).pipe(
            map((response: any) => {
                return response;
            }),
            catchError(error => {
                error.status === 500 &&
                    error.error

                return throwError(error);
            })
        );
    }

}