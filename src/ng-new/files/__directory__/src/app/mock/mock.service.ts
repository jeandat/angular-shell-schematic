import { Injectable } from '@angular/core';
import { getStatusText, InMemoryDbService, ResponseOptions } from 'angular-in-memory-web-api';
import { RequestInfo } from 'angular-in-memory-web-api/interfaces';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';


// tslint:disable-next-line
export interface MockDb {

}

@Injectable({
    providedIn:'root'
})
export class MockService implements InMemoryDbService {

    constructor() {
    }

    createDb(reqInfo?:RequestInfo):{} | Observable<{}> | Promise<{}> {

        // Default returnType
        let returnType = 'object';
        // let returnType  = 'observable';
        // let returnType  = 'promise';

        // Clears the collections if the request body tells it to do so
        if (reqInfo) {
            const body = reqInfo.utils.getJsonBody(reqInfo.req) || {};
            if (body.clear === true) {
                // sites.length = 0;
            }
            // 'returnType` can be 'object' | 'observable' | 'promise'
            returnType = body.returnType || 'object';
        }
        const db:MockDb = {};

        switch (returnType) {
            case ('observable'):
                return of(db).pipe(delay(10));
            case ('promise'):
                return new Promise(resolve => {
                    setTimeout(() => resolve(db), 10);
                });
            default:
                return db;
        }
    }

    // HTTP GET interceptor
    get(reqInfo:RequestInfo) {
        const collectionName = reqInfo.collectionName;
        return undefined; // let the default GET handle the rest
    }

    // The objective is to serve different objects to mimic a true backend.
    responseInterceptor(resOptions:ResponseOptions, reqInfo:RequestInfo) {
        if (resOptions.body) {
            resOptions.body = JSON.parse(JSON.stringify(resOptions.body));
        }
        return resOptions;
    }

    private finishOptions(options:ResponseOptions, {headers, url}:RequestInfo) {
        // @ts-ignore
        options.statusText = getStatusText(options.status);
        options.headers = headers;
        options.url = url;
        return options;
    }


}
