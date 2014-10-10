(function(){
    var headerCell = Object.create(HTMLTableCellElement.prototype);

    headerCell.createdCallback = sortedTableCreatedCallback;

    document.registerElement('tag-th', {
        prototype: headerCell,
        extends: 'th'
    });

    function sortedTableCreatedCallback(){
        console.log("created header cell");
    }
})();
