'use strict';

describe('tag-source', function () {
    var localParseTable;

    beforeEach(function() {
        localParseTable = tableLoader.load('local_parse.html');
    });

    it('should not be undefined', function () {
        expect(localParseTable.source).not.toBeUndefined();
    });


    describe("data", function(){
        it('should not be undefined', function () {
            expect(localParseTable.source.data).not.toBeUndefined();
        });

        it('should have 3 entries', function () {
            expect(localParseTable.source.data.length).toBe(3);
        });

        it('first data entry name should be "Chris"', function () {
            expect(localParseTable.source.data[0].Name).toBe("Chris");
        });
    });

    describe("columns", function() {
        it('should not be undefined', function () {
            expect(localParseTable.source.columns).not.toBeUndefined();
        });

        it('should have 3 entries', function () {
            expect(localParseTable.source.columns.length).toBe(3);
        });

        it('first entry should be name', function () {
            expect(localParseTable.source.columns[0]).toBe("Name");
        });
    });

    describe("header", function() {
        it('should not dublicated after repaint', function () {
            localParseTable.repaint();
            expect(localParseTable.querySelectorAll("th").length).toBe(3);
        });
    });
});
