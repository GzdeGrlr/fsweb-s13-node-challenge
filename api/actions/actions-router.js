// "eylem" routerını buraya yazın
const express = require("express");
const router = express.Router();

const { validateActionsId, validateActions } = require("./actions-middlware");

const Actions = require("./actions-model");

router.get("/", (req, res) => {
  Actions.get()
    .then((action) => {
      res.json(action);
    })
    .catch((err) => {
      res.json([]);
      //console.log(err);
    });
});

router.get("/:id", validateActionsId, (req, res) => {
  res.json(req.actions);
});

router.post("/", validateActions, (req, res) => {
  Actions.insert({
    notes: req.notes,
    description: req.description,
    project_id: req.project_id,
  }).then((newAction) => {
    res.status(201).json(newAction);
  });
});

router.put("/:id", validateActions, validateActionsId, async (req, res) => {
  try {
    await Actions.update(req.params.id, {
      notes: req.notes,
      description: req.description,
      project_id: req.project_id,
      completed: true, // ?
    });

    const updatedAction = await Actions.get(req.params.id);
    res.json(updatedAction);
  } catch (error) {
    res.status(500).json({ message: "Bir şeyler ters gitti" });
  }
});

router.delete("/:id", validateActionsId, async (req, res) => {
  try {
    await Actions.remove(req.params.id);
    res.json(req.actions);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
