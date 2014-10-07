(function(){

    var superTable = Object.create(HTMLTableElement.prototype);

    superTable.createdCallback = superTableCreatedCallback;
    superTable.sortCol = sortCol;

    document.registerElement('super-table', {
        prototype: superTable,
        extends: 'table'
    });

    function superTableCreatedCallback(){
        console.log("supertable created");

        // Call public sortCol function
        this.sortCol(2, false);
    }

    function sortCol(colindex, invert) {
        var columns = [];
        var rows = getRows.call(this);

        [].forEach.call(rows, function(row) {
            columns.push({
                'row': row,
                'sortvalue': row.children[colindex].innerHTML
            });
        });

        rows = columns
            .sort(function(a, b){ return intSort(a.sortvalue, b.sortvalue);})
            .map(function(column){ return column.row; });

        if(invert){
            rows.reverse();
        }

        setRows.call(this, rows);
    }

    function getRows(){
        return this.querySelectorAll('tbody>tr');
    }

    function setRows(rows) {
        var tbody = this.querySelector('tbody');

        [].forEach.call(rows, function(row){
            tbody.appendChild(row);
        });
    }

    function intSort(a, b) {
        return parseFloat(a) - parseFloat(b, 10);
    }

})();
