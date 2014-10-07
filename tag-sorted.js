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

        // Call public sortByColumn function
        this.sortByColumn(2, true);
    }

    function sortByColumn(columnIndex, ascending) {
        var rowsAndSortValues = [];
        var rowElements = getRowElements.call(this);

        [].forEach.call(rowElements, function(rowElement) {
            rowsAndSortValues.push({
                "rowElement": rowElement,
                "sortValue": rowElement.children[columnIndex].innerHTML
            });
        });

        var sortFunction = ascending
            ? function (a, b) { return a.sortValue - b.sortValue; }
            : function (a, b) { return b.sortValue - a.sortValue; };

        rowElements = rowsAndSortValues
            .sort(sortFunction)
            .map(function(column){ return column.rowElement; });

        setRowElements.call(this, rowElements);
    }

    function getRowElements(){
        return this.querySelectorAll('tbody>tr');
    }

    function setRowElements(rowElements) {
        var tbody = this.querySelector('tbody');

        [].forEach.call(rowElements, function(rowElement){
            tbody.appendChild(rowElement);
        });
    }
})();
