import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector:'as-foo',
    templateUrl:'./foo.component.html',
    styleUrls:['./foo.component.scss'],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class FooComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
