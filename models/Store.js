const mongoose = require("mongoose");
const geoCoder = require("../utils/geocoder");

const storeSchema = new mongoose.Schema({
  storeId: {
    type: String,
    required: [true, "store ID is required"],
    unique: true,
    trim: true,
    maxlength: [10, "Store ID must be less than 10 characters"]
  },
  location: {
    type: { type: String, enum: ["Point"] },
    coordinates: { type: [Number], index: "2dsphere" },
    formattedAddress: String
  },
  address: { type: String, required: [true, "Address is required"] },
  createdAt: { type: Date, default: Date.now }
});

// mongoose middleware: geocode & location
storeSchema.pre("save", async function (next) {
  const store = this;

  try {
    const storeLocation = await geoCoder.geocode(store.address);

    console.log(
      "\n pre-saved store location (models/Store.js) ->",
      storeLocation
    );

    store.location = {
      type: "Point",
      coordinates: [storeLocation[0].longitude, storeLocation[0].latitude],
      formattedAddress: storeLocation[0].formattedAddress
    };

    // do this, so the store's address isn't saved to the db
    store.address = undefined;

    next();
  } catch (error) {
    if (error.isOperational) next();
  }
});

module.exports = mongoose.model("Store", storeSchema);
