(function(){
    var sortedTable = Object.create(HTMLTableElement.prototype);

    sortedTable.createdCallback = sortedTableCreatedCallback;
    sortedTable.sortByColumn = sortByColumn;

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
        // todo: how do we get the table here?
        // offsetParent is just a draft
        var table = this.offsetParent;

        // todo: add direction
        table.sortByColumn(e.toElement.cellIndex);
    }

    function sortByColumn(columnIndex, isAscending) {
        var rowsAndSortValues = [];
        var rowElements = getRowElements.call(this);

        [].forEach.call(rowElements, function(rowElement) {
            rowsAndSortValues.push({
                "rowElement": rowElement,
                "sortValue": rowElement.children[columnIndex].innerHTML
            });
        });

        // todo: support string and date sort
        var sortFunction = isAscending
            ? function (a, b) { return a.sortValue - b.sortValue; }
            : function (a, b) { return b.sortValue - a.sortValue; };

        rowElements = rowsAndSortValues
            .sort(sortFunction)
            .map(function(column){ return column.rowElement; });

        setRowElements.call(this, rowElements);
        setTagSortAttributes.call(this, columnIndex, isAscending);
    }

    // todo: update the other attributes
    function setTagSortAttributes(columnIndex, isAscending) {
        var attributeValue = isAscending
            ? 'asc-1'
            : 'desc-1';

        var tagSortAttribute = document.createAttribute("tag-sort");
        tagSortAttribute.value = attributeValue;

        var thElement = this.getElementsByTagName('th')[columnIndex];
        thElement.setAttributeNode(tagSortAttribute);

        // just for debugging
        console.log(thElement);
    }

    function getRowElements(){
        return this.getElementsByTagName('tr');
    }

    function setRowElements(rowElements) {
        var tbodyElement = this.getElementsByTagName('tbody')[0];

        [].forEach.call(rowElements, function(rowElement){
            tbodyElement.appendChild(rowElement);
        });
    }
})();
