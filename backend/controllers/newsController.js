import News from "../models/News.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import deleteCloudinaryImage from "../utils/deleteCloudinaryImage.js";

/*
|--------------------------------------------------------------------------
| Upload Featured Image
|--------------------------------------------------------------------------
*/

export const uploadFeaturedImage = async (req, res, next) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image.",
      });
    }

    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found.",
      });
    }

    if (news.featuredImagePublicId) {
      await deleteCloudinaryImage(news.featuredImagePublicId);
    }

    const result = await uploadToCloudinary(
      req.file,
      "news"
    );

    news.featuredImage = result.secure_url;
    news.featuredImagePublicId = result.public_id;

    await news.save();

    res.status(200).json({
      success: true,
      message: "Featured image uploaded successfully.",
      image: news.featuredImage,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Create News
|--------------------------------------------------------------------------
*/

export const createNews = async (req, res, next) => {
  try {

    const news = await News.create({
      ...req.body,
      author: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "News created successfully.",
      data: news,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get News
|--------------------------------------------------------------------------
*/

export const getNews = async (req, res, next) => {
  try {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = req.query.search || "";
    const category = req.query.category || "";

    const query = {};

    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      query.category = category;
    }

    const news = await News.find(query)
      .populate("author", "firstName lastName")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await News.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: news,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Single News
|--------------------------------------------------------------------------
*/

export const getSingleNews = async (req, res, next) => {
  try {

    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found.",
      });
    }

    news.views += 1;

    await news.save();

    res.status(200).json({
      success: true,
      data: news,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Update News
|--------------------------------------------------------------------------
*/

export const updateNews = async (req, res, next) => {
  try {

    const news = await News.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "News updated successfully.",
      data: news,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Delete News
|--------------------------------------------------------------------------
*/

export const deleteNews = async (req, res, next) => {
  try {

    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found.",
      });
    }

    if (news.featuredImagePublicId) {
      await deleteCloudinaryImage(news.featuredImagePublicId);
    }

    await news.deleteOne();

    res.status(200).json({
      success: true,
      message: "News deleted successfully.",
    });

  } catch (error) {
    next(error);
  }
};