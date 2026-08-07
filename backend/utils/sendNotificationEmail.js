import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({

    host: process.env.MAIL_HOST,

    port: Number(process.env.MAIL_PORT),

    secure: false,

    auth: {

        user: process.env.MAIL_USER,

        pass: process.env.MAIL_PASS,

    },

});


const sendNotificationEmail = async ({

    to,

    subject,

    title,

    message,

}) => {


    const html = `

        <div 
            style="
            font-family:Arial,sans-serif;
            max-width:700px;
            margin:auto;
            border:1px solid #ddd;
            border-radius:8px;
            overflow:hidden;
            "
        >

            <div
                style="
                background:#1E40AF;
                color:white;
                padding:20px;
                text-align:center;
                "
            >

                <h2>
                    Sound Peace International School
                </h2>

            </div>


            <div style="padding:25px;">

                <h3>
                    ${title}
                </h3>


                <p>
                    ${message}
                </p>


                <hr>


                <p 
                    style="
                    font-size:12px;
                    color:#666;
                    "
                >

                    This is an automated notification from the School Management System.

                </p>


            </div>


        </div>

    `;


    await transporter.sendMail({

        from:
        `"Sound Peace International School" <${process.env.MAIL_USER}>`,

        to,

        subject,

        html,

    });


};


export default sendNotificationEmail;