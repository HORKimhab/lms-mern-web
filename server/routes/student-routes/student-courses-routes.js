import express from 'express'
const router = express.Router()


const {
  getCoursesByStudentId,
} = require("../../controllers/student-controller/student-courses-controller");

router.get("/get/:studentId", getCoursesByStudentId);

export default router;
