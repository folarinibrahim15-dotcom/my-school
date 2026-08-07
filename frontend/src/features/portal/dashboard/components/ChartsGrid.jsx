import React from "react";

import StudentGrowthChart from "./StudentGrowthChart";
import RevenueChart from "./RevenueChart";

export default function ChartsGrid() {

    return (

        <div
            className="
            grid
            grid-cols-1
            xl:grid-cols-2
            gap-6
            "
        >

            <StudentGrowthChart />

            <RevenueChart />

        </div>

    );

}