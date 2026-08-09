import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "../components/Layout";

import Home from "../pages/Home";

import About from "../pages/About/About";
import Story from "../pages/About/Story";
import Mission from "../pages/About/Mission";
import Testimonials from "../pages/About/Testimonials";

import Admissions from "../pages/Admissions/Admissions";
import ApplyOnline from "../pages/Admissions/ApplyOnline";
import AcceptAdmission from "../pages/Admissions/AcceptAdmission";

import Curriculum from "../pages/curriculum/Curriculum";
import AwarenessCurriculum from "../pages/curriculum/AwarenessCurriculum";

import News from "../pages/news/News";
import UpcomingEvents from "../pages/news/UpcomingEvents";

import Programs from "../pages/Academics/Programs";
import Departments from "../pages/Academics/Departments";
import Calendar from "../pages/Academics/Calendar";

import Fees from "../pages/Fees";
import Facilities from "../pages/Facilities";
import Alumni from "../pages/Alumni";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";
import PaymentVerify from "../pages/payment/PaymentVerify";
import SecurePayment from "../pages/payment/SecurePayment";
import PaymentReceipt from "../pages/payment/PaymentReceipt";

export default function PublicRoutes() {

    return (

        <Routes>

            <Route element={<Layout />}>

                <Route path="/" element={<Home />} />

                <Route path="/about" element={<About />} />
                <Route path="/about/story" element={<Story />} />
                <Route path="/about/mission" element={<Mission />} />
                <Route path="/about/testimonials" element={<Testimonials />} />

                <Route path="/admissions" element={<Admissions />} />
                <Route path="/admissions/ApplyOnline" element={<ApplyOnline />} />
                <Route path="/admissions/AcceptAdmission" element={<AcceptAdmission />} />

                <Route path="/curriculum" element={<Curriculum />} />
                <Route
                    path="/curriculum/AwarenessCurriculum"
                    element={<AwarenessCurriculum />}
                />

                <Route path="/news" element={<News />} />
                <Route
                    path="/news/UpcomingEvents"
                    element={<UpcomingEvents />}
                />

                <Route
                    path="/academics/programs"
                    element={<Programs />}
                />

                <Route
                    path="/academics/departments"
                    element={<Departments />}
                />

                <Route
                    path="/academics/calendar"
                    element={<Calendar />}
                />

                <Route path="/fees" element={<Fees />} />
                <Route path="/facilities" element={<Facilities />} />
                <Route path="/alumni" element={<Alumni />} />
                <Route path="/contact" element={<Contact />} />

                <Route path="*" element={<NotFound />} />

                <Route path="/payment/callback" element={<PaymentVerify />} />
                <Route path="/secure-payment" element={<SecurePayment />} />
                <Route path="/payment/receipt" element={<PaymentReceipt />} />
            </Route>

        </Routes>

    );

}