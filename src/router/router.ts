import express from "express";
import authRouter from "./authRoutes";
import adminRouter from "./adminRoutes";
import designerRouter from "./designerRoutes";

const router = express();

router.use("/auth", authRouter);
router.use("/admin", adminRouter);
router.use("/me", designerRouter);

exports.router = router;

exports.endpoints = function (app) {
  router.use("/auth", authRouter);
  router.use("/admin", adminRouter);
  router.use("/me", designerRouter);
};
