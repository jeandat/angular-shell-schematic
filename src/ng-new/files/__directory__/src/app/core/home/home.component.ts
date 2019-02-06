import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BaseComponent } from '../base.component';
import { SnackBarService } from '../snackbar/snackbar.service';
import { AppState } from '../store/core.reducer';


/*
    I assumed here that fetching sites only return high level info.
    If you want complete data with trafficOut property you have to fetch a single site.
    I'm assuming that's what you want regarding the fact there is an update button in view.
    Depending on volumetry and data model, other scenarios would have been imaginable without confirmation buttons
    nor subsequent fetch for instance.
*/


@Component({
    selector:'as-home',
    templateUrl:'./home.component.html',
    styleUrls:['./home.component.scss'],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class HomeComponent extends BaseComponent implements OnInit {


    constructor(private snackbar:SnackBarService, private store:Store<AppState>, private cdr:ChangeDetectorRef) {
        super();
    }

    ngOnInit() {
    }

}
