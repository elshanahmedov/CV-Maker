exports.createOne = (Model) => async (req, res) => {
  try {
    const document = await Model.create(req.body);

    res.status(201).json({
      success: true,
      data: document,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAll =
  (Model, populateFields = []) =>
  async (req, res) => {
    try {
      let query = Model.find();

      populateFields.forEach((field) => {
        query = query.populate(field);
      });

      const documents = await query.sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        count: documents.length,
        data: documents,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

exports.getOne =
  (Model, populateFields = []) =>
  async (req, res) => {
    try {
      let query = Model.findById(req.params.id);

      populateFields.forEach((field) => {
        query = query.populate(field);
      });

      const document = await query;

      if (!document) {
        return res.status(404).json({
          success: false,
          message: "Document not found",
        });
      }

      res.status(200).json({
        success: true,
        data: document,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

exports.updateOne = (Model) => async (req, res) => {
  try {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    res.status(200).json({
      success: true,
      data: document,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteOne = (Model) => async (req, res) => {
  try {
    const document = await Model.findByIdAndDelete(req.params.id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
