import express from "express";
import {
  createSection,
  deleteSectionbyId,
  getSections,
  updateSectionbyId,
} from "../controllers/sections.js";

const router = express.Router();

router.get("/sections", getSections);
router.post("/section", createSection);
router.delete("/section/:sectionId", deleteSectionbyId);
router.put("/section/:sectionId", updateSectionbyId);

export default router;
