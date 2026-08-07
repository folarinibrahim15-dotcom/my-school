// ==========================================================
// src/data/acceptAdmissionContent.js
// ----------------------------------------------------------
// Accept Admission Page Content
//
// Stores all page content separately from UI components.
//
// Future:
// Can be replaced by API or CMS content without changing
// any React components.
// ==========================================================

const acceptAdmissionContent = {
  // ==========================================
  // Header Banner
  // ==========================================
  banner: {
    title: "Accept Admission",
  },

  // ==========================================
  // Left Hero Content
  // ==========================================
  hero: {
    heading:
      "We are delighted to offer our child admission into our school. Follow the steps to complete the acceptance process:",
  },

  // ==========================================
  // Step Card
  // ==========================================
  paymentStep: {
    title: "STEP 1: PAY THE ADMISSION ACCEPTANCE FEE",

    items: [
      {
        title:
          "Click the button to securely pay the admission acceptance fee online",

        description:
          "To accept your child’s admission, the school requires a non-refundable Acceptance Fee as stated in the admission offer. This amount will be deducted from the first-term fees payable before resumption.",

      },

      {
        title:
          "Online Payment Options",

        description:
          "Several payment options are available, including transfer, card payment, USSD, etc. Your payment will be securely processed and you’ll receive an email confirmation and receipt.",
      },

      {
        title:
          "Make payment via our secure portal:",

      },
    ],
  },

  // ==========================================
  // CTA Button
  // ==========================================
  button: {
    text: "PAY NOW",

    link: "#",

    ariaLabel:
      "Proceed to Admission Acceptance Payment",
  },

  // ==========================================
  // Footer Quote
  // ==========================================
  quote: {
    text:
      "The upbringing of children is the true human art.",

    author: "",

    accentColor: "#FFD700",
  },
};

export default acceptAdmissionContent;