import axios from "axios";

const sendSMS = async ({ to, message }) => {

    if (!process.env.TERMII_API_KEY) {
        console.log("TERMII_API_KEY is not configured. SMS skipped.");
        return;
    }

    try {

        await axios.post(
            "https://api.ng.termii.com/api/sms/send",
            {
                api_key: process.env.TERMII_API_KEY,
                to,
                from: process.env.TERMII_SENDER_ID || "SPIS",
                sms: message,
                type: "plain",
                channel: "generic",
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

    } catch (error) {

        console.error(
            "SMS sending failed:",
            error.response?.data || error.message
        );

    }

};

export default sendSMS;
