'use strict';

describe('tag-source', function () {
    var localManualTable;

    beforeEach(function() {
        localManualTable = tableLoader.load('local_manual.html');

        localManualTable.source = {
            "columns": ["Name", "Age", "Weight"],
            "data": [
                {"Name": "Chris", "Age": 23, "Weight": 65},
                {"Name": "John",  "Age": 34, "Weight": 60},
                {"Name": "Ben",   "Age": 11, "Weight": 71}
            ]
        };
    });

    describe("headers", function() {
        it('should have 3 entries', function () {
            expect(localManualTable.querySelectorAll("th").length).toBe(3);
        });
    });
});
