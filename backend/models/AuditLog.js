const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: false,
    },

    action: {
      type: String,
      required: true,
      enum: [
        "CREATE_RESUME",
        "UPDATE_RESUME",
        "DELETE_RESUME",
        "VIEW_RESUME",
        "CREATE_TEMPLATE",
        "UPDATE_TEMPLATE",
        "DELETE_TEMPLATE",
      ],
    },

    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("AuditLog", auditLogSchema);
