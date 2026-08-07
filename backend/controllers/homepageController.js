import Homepage from "../models/Homepage.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import deleteCloudinaryImage from "../utils/deleteCloudinaryImage.js";

/*
|--------------------------------------------------------------------------
| Get Homepage
|--------------------------------------------------------------------------
*/

export const getHomepage = async (req, res, next) => {
  try {

    let homepage = await Homepage.findOne();

    if (!homepage) {
      homepage = await Homepage.create({});
    }

    res.status(200).json({
      success: true,
      data: homepage,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Update Homepage
|--------------------------------------------------------------------------
*/

export const updateHomepage = async (req, res, next) => {
  try {

    let homepage = await Homepage.findOne();

    if (!homepage) {
      homepage = await Homepage.create({});
    }

    Object.assign(homepage, req.body);

    await homepage.save();

    res.status(200).json({
      success: true,
      message: "Homepage updated successfully.",
      data: homepage,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Upload Hero Slide
|--------------------------------------------------------------------------
*/

export const uploadHeroSlide = async (req, res, next) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image.",
      });
    }

    let homepage = await Homepage.findOne();

    if (!homepage) {
      homepage = await Homepage.create({});
    }

    const result = await uploadToCloudinary(
      req.file,
      "homepage/hero"
    );

    homepage.heroSlides.push({
      title: req.body.title,
      subtitle: req.body.subtitle || "",
      image: result.secure_url,
      imagePublicId: result.public_id,
      buttonText: req.body.buttonText || "Learn More",
      buttonLink: req.body.buttonLink || "/about",
      isActive: true,
    });

    await homepage.save();

    res.status(201).json({
      success: true,
      message: "Hero slide uploaded successfully.",
      data: homepage.heroSlides,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Delete Hero Slide
|--------------------------------------------------------------------------
*/

export const deleteHeroSlide = async (req, res, next) => {
  try {

    const homepage = await Homepage.findOne();

    if (!homepage) {
      return res.status(404).json({
        success: false,
        message: "Homepage not found.",
      });
    }

    const slide = homepage.heroSlides.id(req.params.slideId);

    if (!slide) {
      return res.status(404).json({
        success: false,
        message: "Hero slide not found.",
      });
    }

    if (slide.imagePublicId) {
      await deleteCloudinaryImage(slide.imagePublicId);
    }

    slide.deleteOne();

    await homepage.save();

    res.status(200).json({
      success: true,
      message: "Hero slide deleted successfully.",
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Update Hero Slide
|--------------------------------------------------------------------------
*/

export const updateHeroSlide = async (req, res, next) => {
  try {

    const homepage = await Homepage.findOne();

    if (!homepage) {
      return res.status(404).json({
        success: false,
        message: "Homepage not found.",
      });
    }

    const slide = homepage.heroSlides.id(req.params.slideId);

    if (!slide) {
      return res.status(404).json({
        success: false,
        message: "Hero slide not found.",
      });
    }

    slide.title = req.body.title ?? slide.title;
    slide.subtitle = req.body.subtitle ?? slide.subtitle;
    slide.buttonText = req.body.buttonText ?? slide.buttonText;
    slide.buttonLink = req.body.buttonLink ?? slide.buttonLink;

    await homepage.save();

    res.status(200).json({
      success: true,
      message: "Hero slide updated successfully.",
      data: slide,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Toggle Hero Slide Active Status
|--------------------------------------------------------------------------
*/

export const toggleHeroSlideStatus = async (req, res, next) => {
  try {

    const homepage = await Homepage.findOne();

    if (!homepage) {
      return res.status(404).json({
        success: false,
        message: "Homepage not found.",
      });
    }

    const slide = homepage.heroSlides.id(req.params.slideId);

    if (!slide) {
      return res.status(404).json({
        success: false,
        message: "Hero slide not found.",
      });
    }

    slide.isActive = !slide.isActive;

    await homepage.save();

    res.status(200).json({
      success: true,
      message: `Hero slide ${
        slide.isActive ? "enabled" : "disabled"
      } successfully.`,
      data: slide,
    });

  } catch (error) {
    next(error);
  }
};
/*
|--------------------------------------------------------------------------
| Reorder Hero Slides
|--------------------------------------------------------------------------
*/

export const reorderHeroSlides = async (req, res, next) => {
  try {

    const { heroSlides } = req.body;

    if (!Array.isArray(heroSlides)) {
      return res.status(400).json({
        success: false,
        message: "heroSlides must be an array.",
      });
    }

    const homepage = await Homepage.findOne();

    if (!homepage) {
      return res.status(404).json({
        success: false,
        message: "Homepage not found.",
      });
    }

    const reorderedSlides = [];

    for (const id of heroSlides) {

      const slide = homepage.heroSlides.id(id);

      if (slide) {
        reorderedSlides.push(slide);
      }

    }

    homepage.heroSlides = reorderedSlides;

    await homepage.save();

    res.status(200).json({
      success: true,
      message: "Hero slides reordered successfully.",
      data: homepage.heroSlides,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Add Homepage Counter
|--------------------------------------------------------------------------
*/

export const addCounter = async (req, res, next) => {
  try {

    const homepage = await Homepage.findOne();

    if (!homepage) {
      return res.status(404).json({
        success: false,
        message: "Homepage not found.",
      });
    }

    const { title, value } = req.body;

    homepage.counters.push({
      title,
      value,
    });

    await homepage.save();

    res.status(201).json({
      success: true,
      message: "Counter added successfully.",
      data: homepage.counters,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Update Homepage Counter
|--------------------------------------------------------------------------
*/

export const updateCounter = async (req, res, next) => {
  try {

    const homepage = await Homepage.findOne();

    if (!homepage) {
      return res.status(404).json({
        success: false,
        message: "Homepage not found.",
      });
    }

    const counter = homepage.counters.id(req.params.counterId);

    if (!counter) {
      return res.status(404).json({
        success: false,
        message: "Counter not found.",
      });
    }

    counter.title = req.body.title ?? counter.title;
    counter.value = req.body.value ?? counter.value;

    await homepage.save();

    res.status(200).json({
      success: true,
      message: "Counter updated successfully.",
      data: counter,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Delete Homepage Counter
|--------------------------------------------------------------------------
*/

export const deleteCounter = async (req, res, next) => {
  try {

    const homepage = await Homepage.findOne();

    if (!homepage) {
      return res.status(404).json({
        success: false,
        message: "Homepage not found.",
      });
    }

    const counter = homepage.counters.id(req.params.counterId);

    if (!counter) {
      return res.status(404).json({
        success: false,
        message: "Counter not found.",
      });
    }

    counter.deleteOne();

    await homepage.save();

    res.status(200).json({
      success: true,
      message: "Counter deleted successfully.",
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Add Why Choose Us Feature
|--------------------------------------------------------------------------
*/

export const addFeature = async (req, res, next) => {
  try {

    const homepage = await Homepage.findOne();

    if (!homepage) {
      return res.status(404).json({
        success: false,
        message: "Homepage not found.",
      });
    }

    const { title, description, icon } = req.body;

    homepage.whyChooseUs.push({
      title,
      description,
      icon,
    });

    await homepage.save();

    res.status(201).json({
      success: true,
      message: "Feature added successfully.",
      data: homepage.whyChooseUs,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Update Why Choose Us Feature
|--------------------------------------------------------------------------
*/

export const updateFeature = async (req, res, next) => {
  try {

    const homepage = await Homepage.findOne();

    if (!homepage) {
      return res.status(404).json({
        success: false,
        message: "Homepage not found.",
      });
    }

    const feature = homepage.whyChooseUs.id(req.params.featureId);

    if (!feature) {
      return res.status(404).json({
        success: false,
        message: "Feature not found.",
      });
    }

    feature.title = req.body.title ?? feature.title;
    feature.description = req.body.description ?? feature.description;
    feature.icon = req.body.icon ?? feature.icon;

    await homepage.save();

    res.status(200).json({
      success: true,
      message: "Feature updated successfully.",
      data: feature,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Delete Why Choose Us Feature
|--------------------------------------------------------------------------
*/

export const deleteFeature = async (req, res, next) => {
  try {

    const homepage = await Homepage.findOne();

    if (!homepage) {
      return res.status(404).json({
        success: false,
        message: "Homepage not found.",
      });
    }

    const feature = homepage.whyChooseUs.id(req.params.featureId);

    if (!feature) {
      return res.status(404).json({
        success: false,
        message: "Feature not found.",
      });
    }

    feature.deleteOne();

    await homepage.save();

    res.status(200).json({
      success: true,
      message: "Feature deleted successfully.",
    });

  } catch (error) {
    next(error);
  }
};