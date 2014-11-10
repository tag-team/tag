(function(){
"use strict";
/**
 * DataSource for tag grid
 * @constructor
 */
function TagSource(seed){
    this.data = seed.data || [];
}
var tagGrid = Object.create(HTMLTableElement.prototype);

tagGrid.createdCallback = tagCreatedCallback;

Object.defineProperty(tagGrid, 'rows', {
    get: getRowElements
});

Object.defineProperty(tagGrid, 'bodyElement', {
    get: getBodyElement
});

document.registerElement('tag-grid', {
    prototype: tagGrid,
    extends: 'table'
});

/** tag-grid callback */
function tagCreatedCallback() {
    this.source = new TagSource({
        data : extractData.call(this) || []
    });
}

/** Returns all HTMLTableRowElements */
function getRowElements() {
    return this.bodyElement.getElementsByTagName('tr');
}

/** Returns first body element of table */
function getBodyElement() {
    return this.tBodies[0];
}

/** Extracts a data property from a native table */
function extractData() {
    var columns = getColumnTitles.call(this);

    if(!columns || !columns.length) {
        return;
    }

    return [].map.call(this.rows, function (elem) {
        var entry = {},
            cells = elem.getElementsByTagName('td');

        columns.forEach(function(col, index) {
            entry[col] = cells[index].innerHTML;
        });

        return entry;
    });
}

/**
 * Returns a array of column titles.
 * @example ["Name", "Age"]
 */
function getColumnTitles() {
    return [].map.call(this.querySelectorAll("th"), function(elem) {
        return elem.innerHTML;
    });
}
})();
