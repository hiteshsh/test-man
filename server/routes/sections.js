import express from "express";
import { createSection, getSections } from "../controllers/sections.js";

const router = express.Router();

router.get("/sections", getSections);
router.post("/section", createSection);
// router.delete("/section/:sectionId", deleteSectionById);
// router.put("/section/:sectionId", updateSectionById);

export default router;
