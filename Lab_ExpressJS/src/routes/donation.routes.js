const {Router} = require("express");
const express = require("express");

const auth = require("../middlewares/auth.middleware")
const donationController = require("../controllers/donation.controller");
const createDonationSchema = require("../validators/donations/create.donation.validator");
const { validate,validateKashierHash, restrictTo} = require("../middlewares/index");

const router = new Router();

router.get("/", auth, donationController.getDonations);
router.get("/all", auth,restrictTo("admin"), donationController.getAllDonations);
router.post("/", auth, validate(createDonationSchema), donationController.createDonation);
router.post("/webhook", express.text({ type: "*/*" }), validateKashierHash, donationController.webhook)



module.exports = router;