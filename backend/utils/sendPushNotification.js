import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";

if (
    getApps().length === 0 &&
    process.env.FIREBASE_SERVICE_ACCOUNT
) {
    initializeApp({
        credential: cert(
            JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
        ),
    });
}

const sendPushNotification = async ({
    deviceToken,
    title,
    body,
}) => {

    if (!deviceToken) return;

    try {

        await getMessaging().send({

            token: deviceToken,

            notification: {

                title,

                body,

            },

        });

    } catch (error) {

        console.error(error);

    }

};

export default sendPushNotification;