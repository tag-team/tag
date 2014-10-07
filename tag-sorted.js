(function(){
    var sortedTable = Object.create(HTMLTableElement.prototype);

    sortedTable.createdCallback = sortedTableCreatedCallback;
    sortedTable.sortByColumn = sortByColumn;

    document.registerElement('tag-sorted', {
        prototype: sortedTable,
        extends: 'table'
    });

    function sortedTableCreatedCallback(){
        console.log("supertable created");

        // Call public sortByColumn function
        this.sortByColumn(2, false);
    }

    function sortByColumn(columnIndex, isReverse) {
        var rowsAndSortValues = [];
        var rowElements = getRowElements.call(this);

        [].forEach.call(rowElements, function(rowElement) {
            rowsAndSortValues.push({
                "rowElement": rowElement,
                "sortValue": rowElement.children[columnIndex].innerHTML
            });
        });

        rowElements = rowsAndSortValues
            .sort(function(a, b){ return intSort(a.sortValue, b.sortValue);})
            .map(function(column){ return column.rowElement; });

        if(isReverse){
            rowElements.reverse();
        }

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

    function intSort(a, b) {
        return a - b;
    }
})();
