var tableLoader = {
    load: function(fixture) {
        var table = window.__html__['test/fixtures/' + fixture];

        var div = document.createElement('div');
        div.innerHTML = table;
        
        return div.childNodes[0];
    }
};