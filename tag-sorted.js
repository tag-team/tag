(function(){
    var sortedTable = Object.create(HTMLTableElement.prototype);

    sortedTable.createdCallback = sortedTableCreatedCallback;
    sortedTable.sortByColumn = sortByColumn;

    Object.defineProperty(sortedTable, 'rowElements', {
        get: getRowElements,
        set: setRowElements
    });

    Object.defineProperty(sortedTable, 'bodyElement', {
        get: getBodyElement
    });

    document.registerElement('tag-sorted', {
        prototype: sortedTable,
        extends: 'table'
    });

    function sortedTableCreatedCallback(){
        console.log("created sortedTable");

        addClickHandlersToHeader.call(this);

        // Call public sortByColumn function
        this.sortByColumn(2, false);
    }

    function addClickHandlersToHeader() {
        var thElements = this.getElementsByTagName('th');

        [].forEach.call(thElements, function(thElement) {
            thElement.addEventListener('click', onHeaderCellClick);
        });
    }

    function onHeaderCellClick(e) {
        var thElement = this;

        // todo: how do we get the table here?
        // offsetParent is just a draft
        var table = getTableElement(thElement);

        // todo:
        // shall we obtain the current sort state from the table here,
        // or extend the th so it can provide it's state,
        // both,
        // or just simply extract the attribute?

        // todo: add direction after finding out the current state
        table.sortByColumn(e.toElement.cellIndex);
    }

    function getTableElement(thElement) {
        return thElement.offsetParent;
    }

    function sortByColumn(columnIndex, isAscending) {
        var rowsAndSortValues = [];

        [].forEach.call(this.rowElements, function(rowElement) {
            rowsAndSortValues.push({
                "rowElement": rowElement,
                "sortValue": rowElement.children[columnIndex].innerHTML
            });
        });

        var sortFunction = function (a,b) {
            return a.sortValue < b.sortValue
                ? isAscending ? -1 : 1
                : a.sortValue > b.sortValue
                    ? isAscending ? 1 : -1
                    : 0;
        };

        this.rowElements = rowsAndSortValues.sort(sortFunction)
                                            .map(function(column){ return column.rowElement; });

        setTagSortAttributes(this, columnIndex, isAscending);
    }

    // todo: update the other attributes as well
    function setTagSortAttributes(tableElement, columnIndex, isAscending) {
        var attributeValue = isAscending
            ? 'asc-1'
            : 'desc-1';

        var tagSortAttribute = document.createAttribute("tag-sort");
        tagSortAttribute.value = attributeValue;

        var thElement = tableElement.getElementsByTagName('th')[columnIndex];
        thElement.setAttributeNode(tagSortAttribute);
    }

    function getRowElements() {
        return this.bodyElement.getElementsByTagName('tr');
    }

    function setRowElements(rowElements) {
        var table = this;
        [].forEach.call(rowElements, function(rowElement) {
            table.bodyElement.appendChild(rowElement);
        });
    }

    function getBodyElement() {
        return this.tBodies[0];
    }
})();
