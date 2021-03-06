import { async, TestBed } from '@angular/core/testing';
import { MockDb, MockService } from './mock.service';

describe('MockService', () => {

    let service:MockService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers:[MockService]
        }).compileComponents();
    }));

    beforeEach(async(() => {
        service = TestBed.get(MockService);
    }));

    it('should create database', () => {
        const db = service.createDb() as MockDb;
        // expect(db).toBeNonEmptyObject();
        // expect(db.sites).toBeNonEmptyArray();
    });

});
