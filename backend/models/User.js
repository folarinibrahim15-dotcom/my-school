// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {

//     firstName: {
//       type: String,
//       required: true,
//       trim: true,
//       minlength: 2,
//       maxlength: 50,
//     },

//     lastName: {
//       type: String,
//       required: true,
//       trim: true,
//       minlength: 2,
//       maxlength: 50,
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },

//     phoneNumber: {
//         type: String,
//         required: true,
//         trim: true,
//     },

//     password: {
//       type: String,
//       required: true,
//       minlength: 8,
//       select: false,
//     },

//     role: {
//       type: String,
//       enum: [
//         "admin",
//         "teacher",
//         "student",
//         "parent",
//       ],
//       default: "parent",
//     },

//     isVerified: {
//       type: Boolean,
//       default: false,
//     },

//     isActive: {
//       type: Boolean,
//       default: true,
//     },

//     avatar: {
//       type: String,
//       default: "",
//     },

//     lastLogin: {
//       type: Date,
//     },
//     refreshToken: {
//     type: String,
//     default: "",
// },
//   },
  
//   {
//     timestamps: true,
//   }
// );

// const User = mongoose.model("User", userSchema);

// export default User;


import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },

    role: {
      type: String,
      enum: [
        "admin",
        "principal",
        "vice_principal",
        "teacher",
        "accountant",
        "librarian",
        "receptionist",
        "student",
        "parent",
      ],
      default: "parent",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    avatar: {
      type: String,
      default: "",
    },

    lastLogin: {
      type: Date,
      default: null,
    },

    resetPasswordToken: {
    type: String,
    default: null,
},

resetPasswordExpire: {
    type: Date,
    default: null,
},

    refreshToken: {
      type: String,
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    passwordChangedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;