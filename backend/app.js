import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
// import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
// import xss from "xss-clean";
import morgan from "morgan";

import  corsOptions  from "./config/corsOptions.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import testRoutes from "./routes/testRoutes.js";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import admissionRoutes from "./routes/admissionRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import parentRoutes from "./routes/parentRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import schoolSettingRoutes from "./routes/schoolSettingRoutes.js";
import homepageRoutes from "./routes/homepageRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import academicLevelRoutes from "./routes/academicLevelRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import curriculumRoutes from "./routes/curriculumRoutes.js";
import timetableRoutes from "./routes/timetableRoutes.js";
import facilityRoutes from "./routes/facilityRoutes.js";
import alumniRoutes from "./routes/alumniRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import feeStructureRoutes from "./routes/feeStructureRoutes.js";
import studentInvoiceRoutes from "./routes/studentInvoiceRoutes.js";
import receiptRoutes from "./routes/receiptRoutes.js";
import studentReportRoutes from "./routes/studentReportRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import financeRoutes from "./routes/financeRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";



const app = express();

/*
|--------------------------------------------------------------------------
| Security Headers
|--------------------------------------------------------------------------
*/

app.use(helmet());

/*
|--------------------------------------------------------------------------
| CORS
|--------------------------------------------------------------------------
*/

app.use(cors(corsOptions));

/*
|--------------------------------------------------------------------------
| Compression
|--------------------------------------------------------------------------
*/

app.use(compression());

/*
|--------------------------------------------------------------------------
| Body Parsers
|--------------------------------------------------------------------------
*/

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

/*
|--------------------------------------------------------------------------
| Cookies
|--------------------------------------------------------------------------
*/

app.use(cookieParser());

/*
|--------------------------------------------------------------------------
| Security Middleware
|--------------------------------------------------------------------------
*/

// app.use(mongoSanitize());

app.use(hpp());

// app.use(xss());

/*
|--------------------------------------------------------------------------
| Logger
|--------------------------------------------------------------------------
*/

app.use(morgan("dev"));

/*
|--------------------------------------------------------------------------
| Rate Limiter
|--------------------------------------------------------------------------
*/

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 100,

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    message:
      "Too many requests. Please try again later.",
  },
});

app.use(limiter);

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "Sound Peace Backend API Running Successfully",
  });
});

/*
|--------------------------------------------------------------------------
| Test Error Route
|--------------------------------------------------------------------------
*/

app.get("/api/test/error", (req, res) => {
  throw new Error("Testing Global Error Handler");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admissions", admissionRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/parents", parentRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/settings", schoolSettingRoutes);
app.use("/api/homepage", homepageRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/academic-levels", academicLevelRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/curricula", curriculumRoutes);
app.use("/api/timetables", timetableRoutes);
app.use("/api/facilities", facilityRoutes);
app.use("/api/alumni", alumniRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/fee-structures", feeStructureRoutes);
app.use("/api/student-invoices", studentInvoiceRoutes);
app.use("/api/receipts", receiptRoutes);
app.use("/api/student-reports", studentReportRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/activity", activityRoutes);

/*
|--------------------------------------------------------------------------
| 404 Handler
|--------------------------------------------------------------------------
*/

app.use(notFound);

/*
|--------------------------------------------------------------------------
| Global Error Handler
|--------------------------------------------------------------------------
*/

app.use(errorHandler);

export default app;