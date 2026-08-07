import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";



/**
 * Export report to PDF
 */
export const exportToPDF = (
    title = "Report",
    columns = [],
    rows = []
) => {

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(title, 14, 20);

    autoTable(doc, {

        startY: 30,

        head: [columns],

        body: rows,

    });

    doc.save(`${title}.pdf`);

};



/**
 * Export report to Excel
 */
export const exportToExcel = (
    filename = "Report",
    data = []
) => {

    const worksheet =
        XLSX.utils.json_to_sheet(data);

    const workbook =
        XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Report"
    );

    const excelBuffer =
        XLSX.write(workbook, {

            bookType: "xlsx",

            type: "array"

        });

    const file = new Blob(
        [excelBuffer],
        {
            type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }
    );

    saveAs(file, `${filename}.xlsx`);

};



/**
 * Print current page
 */
export const printReport = () => {

    window.print();

};