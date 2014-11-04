'use strict';

describe('tag-sorted', function () {
    it('should load and create simple table', function () {
        var tableElement = tableLoader.load('tag-sorted.html');
 
        console.log(tableElement);
        tableElement.sortByColumn(1, true);
        console.log(tableElement);
    });
});
