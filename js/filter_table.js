---
---
;// Prevent editor syntax errors.

const TOP_LVL_COL_INDEX = 0;
const SUB_LVL_COL_INDEX = 1;

let table;

function toggleColumn(index, element) {
    if (index >= table.rows[SUB_LVL_COL_INDEX].cells.length) {
        return;
    }
    element.classList.toggle("columnHidden");
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
    const updatedColspan = columnIsHidden ? currentColspan + 1 : currentColspan - 1;
    if (updatedColspan === 0) {
        topLevelColumn.style.display = "none";
    }
    else {
        topLevelColumn.style.display = "";
    }
    topLevelColumn.setAttribute("colspan", updatedColspan.toString());


}

function toggleSidebar() {
    $("#sidebar, #content").toggleClass("active");
    $(".collapse.in").toggleClass("in");
    $("a[aria-expanded=true]").attr("aria-expanded", "false");
}

function selectRow(index) {
    table.rows[SUB_LVL_COL_INDEX + 1 + index].classList.toggle("selected");
}

function hideUnselectedRows() {
    for (let i = SUB_LVL_COL_INDEX + 1; i < table.rows.length; i ++) {
        if (!table.rows[i].classList.contains("selected")) {
            table.rows[i].style.display = "none";
        }
        else {
            table.rows[i].classList.remove("selected");
        }
    }
}

function showAllRows() {
    for (let i = SUB_LVL_COL_INDEX + 1; i < table.rows.length; i ++) {
        table.rows[i].style.display = "";
    }
}

function handleRowButtonClicked(rowButton) {
    const HIDING_TEXT = "Hide unselected rows";
    const SHOW_ALL_TEXT = "Show all rows";

    if (rowButton.innerText === HIDING_TEXT) {
        hideUnselectedRows();
        rowButton.innerText = SHOW_ALL_TEXT;
        rowButton.classList.remove("btn-success");
        rowButton.classList.add("btn-warning");
    }
    else {
        showAllRows();
        rowButton.innerText = HIDING_TEXT;
        rowButton.classList.remove("btn-warning");
        rowButton.classList.add("btn-success");
    }
}

window.onload = function test() {
    toggleSidebar();
    table = document.getElementById('table');
    $("#sidebar").mCustomScrollbar({theme: "minimal"});
    $("#sidebarCollapse, #dismiss").on("click", toggleSidebar);
};