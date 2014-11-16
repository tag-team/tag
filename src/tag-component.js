var tagGrid = Object.create(HTMLTableElement.prototype);

tagGrid.createdCallback = tagCreatedCallback;
tagGrid.repaint = repaint;

document.registerElement("tag-grid", {
    prototype: tagGrid,
    extends: "table"
});

/** tag-grid callback */
function tagCreatedCallback() {
    var source;

    Object.defineProperty(this, "bodyElement", {
        get: getBodyElement
    });

    Object.defineProperty(this, "source", {
        get: function() { return source; },
        set: function(seed) {
            source = new TagSource(seed);
            this.repaint();
        }
    });

    this.source = {
        columns: getColumnTitles.call(this),
        data: extractData.call(this)
    };
}

function repaint() {
    if(this.source.columns.length){
        paintHeader.call(this);
        paintBody.call(this);
    }
}

function paintHeader() {
    var row, cells;

    if(!this.tHead) {
        this.createTHead();
    }

    row = this.tHead.children[0] || document.createElement("tr");
    cells = row.getElementsByTagName("th");

    this.source.columns.forEach(function(column) {
        var colElement, cellElements = [].filter.call(cells, function(cell){
            return cell.innerHTML === column;
        });

        if(cellElements[0]) {
            colElement = cellElements[0];
        } else {
            colElement = document.createElement("th");
            colElement.innerHTML = column;
        }

        row.appendChild(colElement);
    });

    this.tHead.appendChild(row);
}

function paintBody() {
    // Todo: implement
}

/** Returns first body element of table */
function getBodyElement() {
    return this.tBodies[0];
}

/** Extracts a data property from a native table */
function extractData() {
    var columns = getColumnTitles.call(this);

    if(!columns || !columns.length) {
        return undefined;
    }

    return [].map.call(this.bodyElement.rows, function (elem) {
        var entry = {},
            cells = elem.getElementsByTagName("td");

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
