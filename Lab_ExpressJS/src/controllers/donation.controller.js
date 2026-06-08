const donationServ = require("../services/donation.service");
const sendMail = require("../services/mail.service");
const userServ = require("../services/users.service");


const getDonations = async (req, res) => {

    const donations = await donationServ.getUserDonations(req.user.id);

    res.status(200).json({
        userName: req.user.name,
        donations: {
            ...donations
        }
    });
}

const getAllDonations = async (req, res) => {

    const donations = await donationServ.getAllDonations();
    res.status(200).json({
        info: "all donations",
        donations: {
            ...donations
        }
    });
}
const createDonation = async (req, res) => {
    // create donatuion
    const donation = await donationServ.createDonation(req.body.amount, req.user.id);

    // send req to provider
    const gatewayResponse = await donationServ.createPaymentLink(donation);

    // update donation record (ensure we await the result)
    const updatedDonation = await donationServ.updateDonation(donation._id, { providerSessionID: gatewayResponse._id, link: gatewayResponse.sessionUrl });

    // return updated donation
    return res.status(200).json({
        status: "success",
        data: updatedDonation
    });
}

const webhook = async (req, res) => {
    const { data } = req.body;
    const { merchantOrderId: donationId, status } = data;
    const donationStatus = status === "SUCCESS" ? "completed" : "failed";
    const updatedDonation = await donationServ.updateDonation(donationId, { status: donationStatus });

    const user = await userServ.getUserByEmail(data.merchantDetails.businessEmail);

    const emailData = {
        subject: "Donation Status Update",
        to: user.email,
        name: user.name,
        amount: data.amount,
        donationId: data.merchantOrderId,
    }
     console.log("Email Data: ", emailData);
    sendMail(emailData, "donationSuccess");

    return res.status(200).json({
        status: "success",
        data: "webhook received"
    })
}


module.exports = {
    createDonation,
    webhook,
    getDonations,
    getAllDonations
}