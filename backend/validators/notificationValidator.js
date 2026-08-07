import Joi from "joi";

export const createNotificationValidator = (data) => {

    const schema = Joi.object({

        recipient: Joi.string()
            .required()
            .messages({
                "string.empty": "Recipient is required",
                "any.required": "Recipient is required",
            }),

        title: Joi.string()
            .min(3)
            .max(100)
            .required()
            .messages({
                "string.empty": "Notification title is required",
                "string.min": "Title must contain at least 3 characters",
                "any.required": "Notification title is required",
            }),

        message: Joi.string()
            .min(5)
            .max(500)
            .required()
            .messages({
                "string.empty": "Notification message is required",
                "string.min": "Message is too short",
                "any.required": "Notification message is required",
            }),

        type: Joi.string()
            .valid(
                "SYSTEM",
                "ACADEMIC",
                "FINANCE",
                "EVENT",
                "MESSAGE",
                "SECURITY"
            )
            .default("SYSTEM"),

        priority: Joi.string()
            .valid(
                "LOW",
                "MEDIUM",
                "HIGH",
                "URGENT"
            )
            .default("MEDIUM"),

        metadata: Joi.object()
            .optional()
            .default({})

    });

    return schema.validate(data, {

        abortEarly: false,

        stripUnknown: true,

    });

};