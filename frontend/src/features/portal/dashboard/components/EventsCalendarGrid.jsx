import React from "react";

import UpcomingEvents from "./UpcomingEvents";
import SchoolCalendar from "./SchoolCalendar";

export default function EventsCalendarGrid() {

    return (

        <div
            className="
            grid
            grid-cols-1
            xl:grid-cols-3
            gap-6
            "
        >

            <div className="xl:col-span-2">

                <SchoolCalendar />

            </div>

            <UpcomingEvents />

        </div>

    );

}