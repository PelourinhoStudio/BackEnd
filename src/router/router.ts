import express from "express";
import authRouter from "./authRoutes";
import adminRouter from "./adminRoutes";
import designerRouter from "./designerRoutes";
import publicRouter from "./publicRoutes";

export const router = express();

router.use("/auth", authRouter);
router.use("/admin", adminRouter);
router.use("/me", designerRouter);
router.use("/", publicRouter);
export function endpoints(app) {
  router.use("/auth", authRouter);
  router.use("/admin", adminRouter);
  router.use("/me", designerRouter);
  router.use("/", publicRouter);
}
