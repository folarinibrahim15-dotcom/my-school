import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendReceiptEmail = async ({
  to,
  studentName,
  receiptNumber,
  amount,
  paymentMethod,
  paymentDate,
}) => {

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,

    to,

    subject: `Payment Receipt - ${receiptNumber}`,

    html: `
      <h2>Payment Receipt</h2>

      <p>Dear Parent/Guardian,</p>

      <p>
        Your payment has been received successfully.
      </p>

      <table cellpadding="6">

        <tr>
          <td><strong>Student</strong></td>
          <td>${studentName}</td>
        </tr>

        <tr>
          <td><strong>Receipt No.</strong></td>
          <td>${receiptNumber}</td>
        </tr>

        <tr>
          <td><strong>Amount</strong></td>
          <td>₦${amount.toLocaleString()}</td>
        </tr>

        <tr>
          <td><strong>Payment Method</strong></td>
          <td>${paymentMethod}</td>
        </tr>

        <tr>
          <td><strong>Date</strong></td>
          <td>${new Date(paymentDate).toLocaleString()}</td>
        </tr>

      </table>

      <br>

      <p>
        Thank you for choosing
        <strong>Sound Peace International Schools</strong>.
      </p>
    `,
  });

};

export default sendReceiptEmail;
