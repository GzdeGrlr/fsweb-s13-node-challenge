// projects ara yazılımları buraya

const Project = require("./projects-model");

async function validateProjectId(req, res, next) {
  try {
    const proje = await Project.get(req.params.id);
    if (!proje) {
      res.status(404).json({
        message: "Proje id bulunamadı.",
      });
    } else {
      req.proje = proje;
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: "İşlem yapılamadı",
    });
  }
}

function validateProject(req, res, next) {
  const { description, name } = req.body;

  if (!name || !description) {
    res.status(400).json({
      message: "Name veya description eksik olmamalı.",
    });
  } else {
    req.name = name;
    req.description = description;
    next();
  }
}

module.exports = {
  validateProjectId,
  validateProject,
};
