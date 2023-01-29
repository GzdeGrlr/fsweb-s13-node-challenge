// "project" routerını buraya yazın!
const express = require("express");
const router = express.Router();

const { validateProjectId, validateProject } = require("./projects-middleware");

const Projects = require("./projects-model");

router.get("/", (req, res, next) => {
  Projects.get()
    .then((project) => {
      res.json(project);
    })
    .catch((err) => {
      res.json([]);
      //console.log(err);
    });
});

router.get("/:id", validateProjectId, (req, res) => {
  res.json(req.proje);
});

router.post("/", validateProject, (req, res) => {
  Projects.insert({
    name: req.name,
    description: req.description,
    completed: true, //?
  }).then((newProject) => {
    res.status(201).json(newProject);
  });
});

router.put("/:id", validateProject, validateProjectId, async (req, res) => {
  try {
    await Projects.update(req.params.id, {
      name: req.name,
      description: req.description,
      completed: true, //?
    });

    const updatedProject = await Projects.get(req.params.id);
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: "Bir şeyler ters gitti" });
  }
});

router.delete("/:id", validateProjectId, async (req, res) => {
  try {
    await Projects.remove(req.params.id);
    res.json(req.proje);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/actions", validateProjectId, async (req, res) => {
  try {
    const project = await Projects.getProjectActions(req.params.id);
    res.json(project);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
