// Import fs module
const fs = require("fs");

// Import Tour model
const Tour = require("./../models/tourModel");

// tours data
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, "utf-8")
);

// middleware function for checking id
exports.checkID = (req, res, next, val) => {
  console.log("This is the ID ", val);
  if (val > tours.length - 1) {
    return res.status(404).json({
      status: "Not found",
      message: "Invalid ID",
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  const body = req.body;
  if (!body.name || !body.duration || !body.difficulity) {
    return res.status(400).json({
      status: "Bad request",
      message: "Invalid or missing input",
    });
  }
  next();
};

// Tours req/res functions
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

exports.getTour = (req, res) => {
  const tourID = req.params.id;
  // get the requested data
  const tour = tours[tourID];
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    data: {
      tour: tour,
    },
  });
};

exports.createTour = (req, res) => {
  // create a new ID - DB imitation
  const newID = tours[tours.length - 1].id + 1;
  // Content to be saved in the file
  const newTour = Object.assign({ id: newID }, req.body);

  // push new the content into the tours array
  tours.push(newTour);

  // Write the new content in the file
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "successfully created",
        requestedAt: req.requestTime,
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: "Successfully updated",
    requestedAt: req.requestTime,
    data: {
      tour: "<Updated tour>",
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: "Success",
    requestedAt: req.requestTime,
    data: null,
  });
};
