const courtModel = require('../models/courtModel');

exports.addCourt = async (req, res, next) => {
    try {
        const data = req.body;
        const { court_id } = req.params;

        if (court_id) {
            // UPDATE
            await new Promise((resolve, reject) => {
                courtModel.update(court_id, data, (err) => {
                  if (err) {
                    if (err.message === "No court found with the given ID") {
                      return reject({ status: 404, message: err.message });
                    }
                    return reject(err);
                  }
                  resolve();
                });
              });              

            const updatedCourt = await new Promise((resolve, reject) => {
                courtModel.getById(court_id, (err, row) => {
                    if (err) return reject(err);
                    resolve(row);
                });
            });

            return res.status(200).json({
                message: 'Court updated successfully',
                court: updatedCourt,
            });
        } else {
            // CREATE
            const newCourtId = await new Promise((resolve, reject) => {
                courtModel.create(data, (err, id) => {
                    if (err) return reject(err);
                    resolve(id);
                });
            });

            const newCourt = await new Promise((resolve, reject) => {
                courtModel.getById(newCourtId, (err, row) => {
                    if (err) return reject(err);
                    resolve(row);
                });
            });

            return res.status(200).json({
                message: 'Court created successfully',
                court: newCourt,
            });
        }
    } catch (err) {
        if (err.status === 404) {
          return res.status(404).json({ message: err.message });
        }
        next(err);
      }
};

exports.getCourt = async (req, res, next) => {
    try {
        const { court_id } = req.params;

        if (court_id) {
            // Get specific court
            const court = await new Promise((resolve, reject) => {
                courtModel.getById(court_id, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            if (!court) {
                return res.status(404).json({ message: 'Court not found' });
            }

            return res.json(court);
        } else {
            // Get all courts
            courtModel.getAll((err, rows) => {
                if (err) {
                    console.error("Error fetching all courts:", err);
                    return next(err);
                }

                if (rows.length === 0) {
                    return res.status(404).json({ message: 'No courts found' });
                }

                res.json(rows);
            });
        }
    } catch (err) {
        next(err);
    }
};

exports.deleteCourt = async (req, res, next) => {
    try {
        const { court_id } = req.params;

        // Check if court_id is provided
        if (!court_id) {
            return res.status(400).json({ message: 'Court ID is required' });
        }

        // Check if the court exists before deleting
        const court = await new Promise((resolve, reject) => {
            courtModel.getById(court_id, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });

        if (!court) {
            return res.status(404).json({ message: 'Court not found' });
        }

        // Proceed with the deletion
        await new Promise((resolve, reject) => {
            courtModel.delete(court_id, (err) => {
                if (err) return reject(err);
                resolve();
            });
        });

        return res.status(200).json({ message: 'Court deleted successfully' });
    } catch (err) {
        next(err);
    }
};

