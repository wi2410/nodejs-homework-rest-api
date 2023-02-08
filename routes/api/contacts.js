const express = require('express');

const {auth, validation, ctrlWrapper} = require("../../middlewares");
const {joiSchema, statusJoiSchema} = require("../../models/contact");
const {contacts: ctrl} = require("../../controllers")

const router = express.Router()

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", auth, validation(joiSchema), ctrlWrapper(ctrl.add));

router.put("/:contactId", validation(joiSchema), ctrlWrapper(ctrl.updateById));

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

router.patch("/:contactId/favorite", validation(statusJoiSchema), ctrlWrapper(ctrl.updateStatusContact));

module.exports = router;
