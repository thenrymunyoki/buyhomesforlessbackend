const express = require("express");
const Property = require("../Modelss/SubmitListings");
const router = express.Router();
// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: (req, file, callBack) => {
//     if (file.fieldname === "thumbnail") {
//       // if uploading thumbnail
//       callBack(null, "./uploads/thumbnail");
//     } else if (file.fieldname === "picture") {
//       // else uploading picture
//       callBack(null, "./uploads/picture");
//     }
//   },
//   filename: (req, file, callBack) => {
//     if (!req.body.picture) req.body.picture = [];
//     const fileName = Date.now() + file.originalname;
//     if (file.fieldname === "thumbnail") {
//       req.body.thumbnail = "uploads/thumbnail/" + fileName;
//     } else {
//       req.body.picture.push("uploads/picture/" + fileName);
//     }
//     callBack(null, fileName);
//   },
// });

// const upload = multer({ storage: storage });

router.get("/get-properties", (req, res) => {
  try {
    Property.find({}).then((response) => {
      res.status(200).json({
        success: true,
        result: response,
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// router.post("/category/create", async (req, res) => {
//   const category = await new Category(req.body);
//   try {
//     category.save().then((response) => {
//       res.json({
//         Msg: `Category Saved Sucessfully`,
//         success: true,
//         result: response,
//       });
//     });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

router.get("/property/:id", (req, res) => {
  try {
    Property.findById(req.params.id)
      .populate(["Author", "Features", "Details.near"])
      .then((response) => {
        res.status(200).json({
          success: true,
          result: response,
        });
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put(
  "/property/:id/update",
  // upload.fields([{ name: "thumbnail" }, { name: "picture" }]),
  (req, res) => {
    const {
      description,
      name,
      status,
      price,
      period,
      type,
      currency,
      space,
      land,
      video,
      lat,
      long,
      address,
      country,
      city,
      provice,
      zipcode,
      features,
      id,
      beds,
      bathrooms,
      condition,
      built,
      neighbor,
      living,
      dining,
      story,
      parking,
      lotsize,
      view,
      near,
      category,
      author,
    } = req.body;

    const listing = {
      BasicInformation: {
        description: description,
        name: name,
        status: status,
        price: price,
        currency: currency,
        period: period,
        type: type,
        space: space,
        land: land,
        video: video,
      },
      Location: {
        latitude: lat,
        longitude: long,
        address: address,
        county: country,
        city: city,
        provice: provice,
        zipcode: zipcode,
      },
      Features: features,
      // Gallery: {},
      // Features: features,
      Details: {
        id: id,
        beds: beds,
        bathrooms: bathrooms,
        condition: condition,
        built: built,
        neighbor: neighbor,
        living: living,
        dining: dining,
        story: story,
        parking: parking,
        lotsize: lotsize,
        view: view,
        near: near ? near : [],
      },
      category: category,
      Author: author,
    };
    // if (req.body.thumbnail && req.body.thumbnail !== "undefined") {
    //   listing.Gallery.file = req.body.thumbnail;
    // }
    // if (req.body.picture && req.body.picture.length !== 0) {
    //   listing.Gallery.picture = req.body.picture;
    // }
    // console.log(listing);
    try {
      Property.findByIdAndUpdate(req.params.id, listing).then((response) => {
        res.status(200).json({
          success: true,
          result: response,
        });
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

router.delete("/delete/property/:id", (req, res) => {
  Property.findByIdAndDelete(req.params.id, (err) => {
    if (!err) {
      Property.find({}).then((response) => {
        res.status(200).json({
          Msg: `${req.params.id} deleted Sucessfully`,
          success: true,
          result: response,
        });
      });
    } else {
      res.status(500).json(err);
    }
  });
});

module.exports = router;
