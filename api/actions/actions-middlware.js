// eylemlerle ilgili ara katman yazılımları yazın

const Actions = require("./actions-model");

async function validateActionsId(req, res, next) {
  try {
    const actions = await Actions.get(req.params.id);
    if (!actions) {
      res.status(404).json({
        message: "Proje id bulunamadı.",
      });
    } else {
      req.actions = actions;
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: "İşlem yapılamadı",
    });
  }
}

function validateActions(req, res, next) {
  const { project_id, notes, description } = req.body;

  if (!notes || !description || !project_id) {
    res.status(400).json({
      message: "Notes, description, proje id'si eksik olmamalı.",
    });
  } else {
    req.notes = notes;
    req.description = description;
    req.project_id = project_id;
    next();
  }
}

module.exports = {
  validateActionsId,
  validateActions,
};
