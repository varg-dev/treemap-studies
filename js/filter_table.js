---
---
;// Prevent editor syntax errors.

const TOP_LVL_COL_INDEX = 0;
const SUB_LVL_COL_INDEX = 1;

let table;

function toggleColumn(index, element) {
    console.log(element);
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


window.onload = function test() {
    toggleSidebar();
    table = document.getElementById('table');
    $("#sidebar").mCustomScrollbar({theme: "minimal"});
    $("#sidebarCollapse, #dismiss").on("click", toggleSidebar);
};