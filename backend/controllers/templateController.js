const Template = require("../models/Template");
const AuditLog = require("../models/AuditLog");
const { getAll, getOne, updateOne, deleteOne } = require("./crudController");

exports.createTemplate = async (req, res) => {
  try {
    const template = await Template.create(req.body);

    await AuditLog.create({
      user: req.body.createdBy,
      action: "CREATE_TEMPLATE",
      description: `Template created: ${template.name}`,
    });

    res.status(201).json({
      success: true,
      template,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getTemplates = getAll(Template, ["createdBy"]);
exports.getTemplateById = getOne(Template, ["createdBy"]);
exports.updateTemplate = updateOne(Template);
exports.deleteTemplate = deleteOne(Template);
