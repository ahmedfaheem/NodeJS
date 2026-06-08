const { default: axios } = require("axios");
const donation = require("../models/donation.model")

const getUserDonations = async (userId) =>{
    // order by Newest First
    const donations = await donation.find({userId: userId}).sort({createdAt: -1});
    return donations;
}



const getAllDonations = async () =>{
    // order by Newest First
    const donations = await donation.find().sort({createdAt: -1});
    return donations;
}
const createDonation = async (amount, userId) =>{
  
    const donate = await donation.create({amount:amount, userId: userId});
    return donate;
}


const  updateDonation = async(id, data) =>{
    const donate = await donation.findByIdAndUpdate(id, data, {new: true});
    return donate;
}

const createPaymentLink = async (donation) => {
  try {
    const url = "https://test-api.kashier.io/v3/payment/sessions";
    const payload = {
      maxFailureAttempts: 3,
      paymentType: "credit",
      amount: donation.amount.toString(),
      currency: "EGP",
      order: donation._id,
      merchantRedirect: "https://example.com/redirect",
      display: "en",
      type: "one-time",
      allowedMethods: "card,wallet",
      redirectMethod: null,
      iframeBackgroundColor: "#FFFFFF",
      metaData: {
        customKey: "customValue",
        displayNotes: { key: "value" },
      },
      merchantId: process.env.KASHIER_MERCHANT_ID,
      failureRedirect: false,
      brandColor: "#FF5733",
      defaultMethod: "card",
      description: `Payment for order ${donation._id}`,
      manualCapture: false,
      customer: {
        email: "john@gmail.com",
        reference: "894321",
      },
      saveCard: "optional",
      retrieveSavedCard: true,
      interactionSource: "ECOMMERCE",
      enable3DS: true,
      serverWebhook: "https://subtract-defile-oblivious.ngrok-free.dev/donation/webhook",
      notes: "Special handling required",
    };

    const headers = {
      Authorization: process.env.KASHIER_SECRET_KEY,
      "api-key": process.env.KASHIER_API_KEY,
      "Content-Type": "application/json",
    };

    const response = await axios.post(url, payload, { headers });
    return response.data;
  } catch (err) {
    if (err.response && err.response.data) throw err.response.data;
    throw err;
  }
};

const handelWebhook = async(donation) =>{


}



module.exports = {
    createDonation,
    updateDonation,
    handelWebhook,
    createPaymentLink,
    getUserDonations,
    getAllDonations
}
