---
---
;// Prevent editor syntax errors.
let disabledColumns = {

};

const TOP_LVL_COL_INDEX = 0;
const SUB_LVL_COL_INDEX = 1;

let currentTableState;
let table;

class Column {
    constructor(index, heading,htmlElement) {
        this.index = index;
        this.heading = heading;
        this.htmlElement = htmlElement;
    }
}

class SubLevelColumn extends Column {
    constructor(index, heading, htmlElement, topLevelColumnIndex) {
        super(index, heading, htmlElement);
        this.topLevelColumnIndex = topLevelColumnIndex;
    }
}

class TableColumns {
    constructor(topLevelColumns, subLevelColumns) {
        this.topLevelColumns = topLevelColumns;
        this.subLevelColumns = subLevelColumns;
    }
}

class TopLevelColumn extends Column {
    constructor(index, heading, htmlElement, colspan, subLevelColumns, subLevelColumnBeginningIndex) {
        super(index, heading, htmlElement);
        this.colspan = colspan;
        this.subLevelColumns = subLevelColumns;
        this.subLevelColumnBeginningIndex = subLevelColumnBeginningIndex;
        console.assert(subLevelColumns.length === colspan);
    }
}

function loadInitialTableState() {
    table = document.getElementById('table');
    console.assert(table.tHead.rows.length === 2);

    // Create all top level columns and parallel their respective sub level columns.
    const topLevelColumns = [];
    const subLevelColumns = [];
    let subLevelColumnsIndex = 0;
    for (let i = 0; i < table.tHead.rows[TOP_LVL_COL_INDEX].cells.length; i++) {
        const currentTopLevelCell = table.tHead.rows[TOP_LVL_COL_INDEX].cells[i];
        const currentTopLevelColumnColspan = Number(currentTopLevelCell.getAttribute('colspan'));
        const currentSubLevelColumns = [];
        // Collect all sub level columns of the current top level column.
        for (let j = 0; j < currentTopLevelColumnColspan; j++) {
            const currentColumnIndex = subLevelColumnsIndex + j;
            const currentSubLevelCell = table.tHead.rows[SUB_LVL_COL_INDEX].cells[currentColumnIndex];
            const currentSubLevelColumn = new SubLevelColumn(currentColumnIndex, currentSubLevelCell.innerText, currentSubLevelCell, i);
            currentSubLevelColumns.push(currentSubLevelColumn);
            subLevelColumns.push(currentSubLevelColumn);
        }
        subLevelColumnsIndex += currentTopLevelColumnColspan;
        const currentTopLevelColumn = new TopLevelColumn(i, currentTopLevelCell.innerText, currentTopLevelCell, currentTopLevelColumnColspan, currentSubLevelColumns, subLevelColumnsIndex);
        topLevelColumns.push(currentTopLevelColumn);
    }
    currentTableState = new TableColumns(topLevelColumns, subLevelColumns);
}

function hideColumn(index) {
    console.log(`hiding: ${index}`);
    // TODO reduce the data stuff, its not needed.
    if (index >= currentTableState.subLevelColumns.length) {
        return;
    }
    const subLevelColumn = currentTableState.subLevelColumns[index];
    subLevelColumn.hidden = true;
    for (let i = SUB_LVL_COL_INDEX; i < table.rows.length; i++) {
        table.rows[i].cells[index].style.display = "none";
    }
    const decreasedColspan = Number(table.rows[TOP_LVL_COL_INDEX].cells[subLevelColumn.topLevelColumnIndex].getAttribute("colspan")) - 1;
    table.rows[TOP_LVL_COL_INDEX].cells[subLevelColumn.topLevelColumnIndex].setAttribute("colspan", decreasedColspan);
}

function toggleColumn(index) {
    // TODO reduce the data stuff, its not needed.
    if (index >= currentTableState.subLevelColumns.length) {
        return;
    }
    const subLevelColumn = table.rows[SUB_LVL_COL_INDEX].cells[index];
    const columnIsHidden = subLevelColumn.style.display === "none";
    if (columnIsHidden) {
        // Make column visible.
        for (let i = SUB_LVL_COL_INDEX; i < table.rows.length; i++) {
            table.rows[i].cells[index].style.display = "";
        }
    }
    else {
        // Make column invisible.
        for (let i = SUB_LVL_COL_INDEX; i < table.rows.length; i++) {
            table.rows[i].cells[index].style.display = "none";
        }
    }
    // Adjust the top level heading.
    const topLevelColumnIndex = Number(subLevelColumn.getAttribute("topLevelColumnIndex"));
    const topLevelColumn = table.rows[TOP_LVL_COL_INDEX].cells[topLevelColumnIndex];
    const currentColspan = Number(topLevelColumn.getAttribute("colspan"));
    console.log(currentColspan);
    const updatedColspan = columnIsHidden ? currentColspan + 1 : currentColspan - 1;
    if (updatedColspan === 0) {
        topLevelColumn.style.display = "none";
    }
    else {
        topLevelColumn.style.display = "";
    }
    topLevelColumn.setAttribute("colspan", updatedColspan.toString());


}

function extendColumn(index) {
    console.log(`showing: ${index}`);
    if (index >= table.rows[TOP_LVL_COL_INDEX].cells.length) {
        return;
    }
    const topLevelColumn = currentTableState.topLevelColumns[index];
    const originalColspan = topLevelColumn.subLevelColumns.length;
    table.rows[TOP_LVL_COL_INDEX].cells[index].setAttribute("colspan", originalColspan.toString());
    for (let subLevelColumn of topLevelColumn.subLevelColumns) {
        for (let i = SUB_LVL_COL_INDEX; i < table.rows.length; i++) {
            table.rows[i].cells[subLevelColumn.index].style.display = "";
        }
    }
}

function toggleSidebar() {
    $("#sidebar, #content").toggleClass("active");
    $(".collapse.in").toggleClass("in");
    $("a[aria-expanded=true]").attr("aria-expanded", "false");
}


window.onload = function test() {
    //const col = document.getElementById('Study ID');
    //col.style.visibility = "collapse";
    //console.log(col);
    // display: none works but you need to decrease the colspan of the tlh
    toggleSidebar();
    loadInitialTableState()
    $("#sidebar").mCustomScrollbar({theme: "minimal"});

    $("#sidebarCollapse, #dismiss").on("click", toggleSidebar);
};