import { getActivityTimeline } from "../services/activityService.js";

/*
|--------------------------------------------------------------------------
| Dashboard Activity Timeline
|--------------------------------------------------------------------------
| GET /api/activity
|--------------------------------------------------------------------------
*/

export const getActivities = async (req, res) => {

    try {

        const activities = await getActivityTimeline();

        res.status(200).json({

            success: true,

            count: activities.length,

            activities,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};