import express from "express";
import authController from "./controllers/auth.controller";
import cacheController from "./controllers/cache.controller";
import dataController from "./controllers/data.controller";
import userController from "./controllers/user.controller";

const router = express.Router();

router.route("/api/user").get(userController.list);
router.route("/api/user/create").post(userController.create);
router.param("userId", userController.userByID);
router
  .route("/api/user/:userId")
  .get(authController.requireSignin, userController.read)
  .put(
    authController.requireSignin,
    authController.hasAuthorization,
    userController.update
  )
  .delete(
    authController.requireSignin,
    authController.hasAuthorization,
    userController.remove
  );

router.route("/api/user/password/:userId").post(userController.checkPassword);

router.route("/auth/signin").post(authController.signin);
router.route("/auth/signout").post(authController.signout);

router.route("/api/cache").get(cacheController.list);
router.route("/api/data").get(dataController.list);

export default router;
