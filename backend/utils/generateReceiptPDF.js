import PDFDocument from "pdfkit";

/**
 * Generates a receipt PDF and streams it to the response.
 */
const generateReceiptPDF = (receipt, res) => {
  const doc = new PDFDocument({
    size: "A4",
    margin: 50,
  });

  const filename = `${receipt.receiptNumber}.pdf`;

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `inline; filename="${filename}"`
  );

  doc.pipe(res);

  /*
  |--------------------------------------------------------------------------
  | Header
  |--------------------------------------------------------------------------
  */

  doc
    .fontSize(22)
    .text("SOUND PEACE INTERNATIONAL SCHOOLS", {
      align: "center",
    });

  doc
    .moveDown(0.5)
    .fontSize(16)
    .text("OFFICIAL PAYMENT RECEIPT", {
      align: "center",
    });

  doc.moveDown(2);

  /*
  |--------------------------------------------------------------------------
  | Receipt Information
  |--------------------------------------------------------------------------
  */

  doc.fontSize(12);

  doc.text(`Receipt Number: ${receipt.receiptNumber}`);
  doc.text(`Student: ${receipt.student.firstName} ${receipt.student.lastName}`);
  doc.text(`Admission No: ${receipt.student.admissionNumber || "-"}`);
  doc.text(`Invoice: ${receipt.invoice.invoiceNumber}`);
  doc.text(`Payment Ref: ${receipt.payment.paymentReference}`);

  doc.moveDown();

  doc.text(`Amount Paid: ₦${receipt.amount.toLocaleString()}`);
  doc.text(`Payment Method: ${receipt.paymentMethod}`);
  doc.text(
    `Payment Date: ${new Date(receipt.paymentDate).toLocaleString()}`
  );

  doc.moveDown();

  doc.text(`Remarks: ${receipt.remarks || "-"}`);

  doc.moveDown(3);

  /*
  |--------------------------------------------------------------------------
  | Footer
  |--------------------------------------------------------------------------
  */

  doc
    .fontSize(10)
    .text(
      "This receipt is electronically generated and does not require a physical signature.",
      {
        align: "center",
      }
    );

  doc.end();
};

export default generateReceiptPDF;
