import React from "react";
import { useSelector } from "react-redux";
import { FaCalendarAlt, FaSmileBeam } from "react-icons/fa";

export default function ParentWelcome() {

  const user = useSelector((state) => state.auth.user);
  const hour = new Date().getHours();

  let greeting = "Good Evening";
  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  const today = new Date().toLocaleDateString("en-NG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const section = {
    background: "linear-gradient(90deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)", // from-blue-700 via-blue-600 to-blue-500
    borderRadius: "1.5rem", // rounded-2xl
    boxShadow: "0 20px 40px rgba(37, 99, 235, 0.25)", // shadow-lg premium
    padding: "clamp(24px, 5vw, 2rem)", // p-8 responsive
    color: "#ffffff",
    marginBottom: "2rem", // mb-8
    width: "100%",
    boxSizing: "border-box",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  };

  const topRow = {
    display: "flex",
    flexDirection: "column", // mobile: stack
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "1.5rem" // gap-6
  };

  const topRowDesktop = `
    @media (min-width: 1024px) {
        .parent-top-row {
            flex-direction: row !important;
            align-items: center !important;
        }
    }
  `;

  const left = {
    flex: "1 1 auto",
    minWidth: 0
  };

  const greetingTitle = {
    fontSize: "clamp(1.875rem, 5vw, 2.25rem)", // text-3xl lg:text-4xl
    fontWeight: "700",
    margin: 0,
    lineHeight: 1.2
  };

  const welcomeText = {
    marginTop: "0.75rem", // mt-3
    color: "#dbeafe", // text-blue-100
    fontSize: "clamp(1rem, 3vw, 1.125rem)" // text-lg
  };

  const subText = {
    marginTop: "0.5rem", // mt-2
    color: "#bfdbfe" // text-blue-200
  };

  const dateCard = {
    backgroundColor: "rgba(255, 255, 255, 0.2)", // bg-white/20
    backdropFilter: "blur(12px)", // backdrop-blur-md
    WebkitBackdropFilter: "blur(12px)",
    borderRadius: "0.75rem", // rounded-xl
    padding: "1.25rem 1.5rem", // px-5 py-4
    display: "flex",
    alignItems: "center",
    gap: "1rem", // gap-4
    flexShrink: 0,
    border: "1px solid rgba(255, 255, 255, 0.15)"
  };

  const dateLabel = {
    fontSize: "0.875rem", // text-sm
    color: "#dbeafe" // text-blue-100
  };

  const dateValue = {
    fontWeight: "600",
    margin: 0,
    marginTop: "0.25rem"
  };

  const bottomCard = {
    marginTop: "2rem", // mt-8
    backgroundColor: "rgba(255, 255, 255, 0.15)", // bg-white/15
    borderRadius: "0.75rem", // rounded-xl
    padding: "1.25rem", // p-5
    display: "flex",
    alignItems: "center",
    gap: "1rem", // gap-4
    border: "1px solid rgba(255, 255, 255, 0.1)"
  };

  const bottomTitle = {
    fontSize: "1.125rem", // text-lg
    fontWeight: "600",
    margin: 0
  };

  const bottomDesc = {
    color: "#dbeafe", // text-blue-100
    marginTop: "0.25rem", // mt-1
    lineHeight: 1.6
  };

  return (
    <>
      <style>{topRowDesktop}</style>
      <section style={section}>
        
        <div className="parent-top-row" style={topRow}>
          
          {/* Left */}
          <div style={left}>
            <h1 style={greetingTitle}>
              {greeting}, {user?.firstName || "Parent"} 👋
            </h1>

            <p style={welcomeText}>
              Welcome back to the Parent Portal.
            </p>

            <p style={subText}>
              Stay connected with your child's academic progress and school activities.
            </p>
          </div>

          {/* Right */}
          <div style={dateCard}>
            <FaCalendarAlt size={28} />
            <div>
              <p style={dateLabel}>
                Today's Date
              </p>
              <h3 style={dateValue}>
                {today}
              </h3>
            </div>
          </div>

        </div>

        {/* Bottom Card */}
        <div style={bottomCard}>
          <FaSmileBeam size={30} color="#fde047" /> {/* text-yellow-300 */}
          <div>
            <h3 style={bottomTitle}>
              We're Glad You're Here!
            </h3>
            <p style={bottomDesc}>
              Thank you for partnering with Sound Peace International Schools.
              Together, we build a brighter future for every child.
            </p>
          </div>
        </div>

      </section>
    </>
  );
}