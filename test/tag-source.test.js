'use strict';

describe('tag-source', function () {
    var basicTable;

    beforeEach(function() {
        basicTable = tableLoader.load('tag-basic.html');
    });

    it('should not be undefined', function () {
        expect(basicTable.source).not.toBeUndefined();
    });

    it('should have a data property', function () {
        expect(basicTable.source.data).not.toBeUndefined();
    });

    it('should have 3 data entries', function () {
        expect(basicTable.source.data.length).toBe(3);
    });

    it('first data entry name should be "Chris"', function () {
        expect(basicTable.source.data[0].Name).toBe("Chris");
    });
});
