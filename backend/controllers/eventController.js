import Event from "../models/Event.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import deleteCloudinaryImage from "../utils/deleteCloudinaryImage.js";

/*
|--------------------------------------------------------------------------
| Create Event
|--------------------------------------------------------------------------
*/

export const createEvent = async (req, res, next) => {
  try {

    const event = await Event.create(req.body);

    res.status(201).json({
      success: true,
      message: "Event created successfully.",
      data: event,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Events (Search + Filter + Pagination)
|--------------------------------------------------------------------------
*/

export const getEvents = async (req, res, next) => {
  try {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const {
      search,
      category,
      isFeatured,
      isActive,
    } = req.query;

    const query = {};

    /*
    |--------------------------------------------------------------------------
    | Search
    |--------------------------------------------------------------------------
    */

    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
        {
          venue: {
            $regex: search,
            $options: "i",
          },
        },
        {
          organizer: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    /*
    |--------------------------------------------------------------------------
    | Filters
    |--------------------------------------------------------------------------
    */

    if (category) {
      query.category = category;
    }

    if (isFeatured !== undefined) {
      query.isFeatured = isFeatured === "true";
    }

    if (isActive !== undefined) {
      query.isActive = isActive === "true";
    }

    const events = await Event.find(query)
      .sort({
        displayOrder: 1,
        eventDate: 1,
      })
      .skip(skip)
      .limit(limit);

    const total = await Event.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      count: events.length,
      data: events,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Single Event
|--------------------------------------------------------------------------
*/

export const getEvent = async (req, res, next) => {
  try {

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: event,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Update Event
|--------------------------------------------------------------------------
*/

export const updateEvent = async (req, res, next) => {
  try {

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event updated successfully.",
      data: event,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Delete Event
|--------------------------------------------------------------------------
*/

export const deleteEvent = async (req, res, next) => {
  try {

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    if (event.bannerPublicId) {
      await deleteCloudinaryImage(
        event.bannerPublicId
      );
    }

    await event.deleteOne();

    res.status(200).json({
      success: true,
      message: "Event deleted successfully.",
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Upload Event Banner
|--------------------------------------------------------------------------
*/

export const uploadEventBanner = async (req, res, next) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image.",
      });
    }

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    if (event.bannerPublicId) {
      await deleteCloudinaryImage(event.bannerPublicId);
    }

    const result = await uploadToCloudinary(
      req.file,
      "events/banners"
    );

    event.banner = result.secure_url;
    event.bannerPublicId = result.public_id;

    await event.save();

    res.status(200).json({
      success: true,
      message: "Event banner uploaded successfully.",
      banner: event.banner,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Toggle Featured Event
|--------------------------------------------------------------------------
*/

export const toggleEventFeatured = async (req, res, next) => {
  try {

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    event.isFeatured = !event.isFeatured;

    await event.save();

    res.status(200).json({
      success: true,
      message: `Event ${
        event.isFeatured
          ? "featured"
          : "removed from featured"
      } successfully.`,
      data: event,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Enable / Disable Event
|--------------------------------------------------------------------------
*/

export const toggleEventStatus = async (req, res, next) => {
  try {

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    event.isActive = !event.isActive;

    await event.save();

    res.status(200).json({
      success: true,
      message: `Event ${
        event.isActive
          ? "enabled"
          : "disabled"
      } successfully.`,
      data: event,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Upcoming Events
|--------------------------------------------------------------------------
*/

export const getUpcomingEvents = async (req, res, next) => {
  try {

    const today = new Date();

    const events = await Event.find({
      eventDate: { $gte: today },
      isActive: true,
    }).sort({
      eventDate: 1,
    });

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Past Events
|--------------------------------------------------------------------------
*/

export const getPastEvents = async (req, res, next) => {
  try {

    const today = new Date();

    const events = await Event.find({
      eventDate: { $lt: today },
    }).sort({
      eventDate: -1,
    });

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });

  } catch (error) {
    next(error);
  }
};
