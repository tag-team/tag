TAG - The Awesome Grid
========

[![Build Status](https://travis-ci.org/tag-team/tag.svg?branch=master)](https://travis-ci.org/tag-team/tag)

### A grid component written with web components and zero dependencies

* Lightweight
* No dependencies
* Modular
* Extendable

## Develop
* Download and install NodeJS: http://nodejs.org/download/
* Install gulp globally: `npm install gulp -g`
* Install local dev dependencies: `npm install`
* Run gulp `gulp`

## Requirements
Use Chrome 36 to use it without a polyfill.


## Usage
### Modes
There are four ways to initialize a TAG grid.
* Local parse mode
* Local manual mode
* Source component mode
* Source manual mode

### Local parse mode
Local parse mode can be used to initialize a tag grid without using javascript.

```
<table is="tag-grid">
    <thead>
        <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Weight</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Chris</td>
            <td>23</td>
            <td>65</td>
        </tr>
        <tr>
            <td>John</td>
            <td>34</td>
            <td>60.2</td>
        </tr>
        <tr>
            <td>Ben</td>
            <td>11</td>
            <td>61</td>
        </tr>
    </tbody>
</table>
```

### Local manual mode
Local manual mode can be used to initialize a tag grid with javascript.

```
<table id="friends" is="tag-grid"></table>
```

```
document.getElementById("friends").source({
    rows: ["Name", "Age", "Weight"]
    data: [
        {"Name": "Chris", "Age": 23, "Weight": 65}
        {"Name": "John",  "Age": 34, "Weight": 60}
        {"Name": "Ben",   "Age": 11, "Weight": 71}
    ],
});
```

### Source component mode
### Source manual mode
