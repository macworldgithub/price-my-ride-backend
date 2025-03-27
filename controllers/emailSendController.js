const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", 
  host: "smtp.gmail.com",
  port: 465,
  debug:true,
  logger:true,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});
console.log(process.env.EMAIL_USER,"apap")

const GetEmailTemplate = (name, email, phone, model, make, odometer, buildYear, specs) => {
  return `
    <table style="width: 100%; max-width: 600px; margin: auto; font-family: Arial, sans-serif; border: 1px solid #ddd; border-radius: 10px; padding: 20px; background-color: #f9f9f9;">
      <tr>
        <td style="text-align: center;">
          <h2 style="color: #333;">🚗 Car Selling Request</h2>
          <p style="color: #555;">A user has submitted a request to sell their car. Below are the details:</p>
        </td>
      </tr>

      <tr><td style="padding: 10px 0;"><strong>Name:</strong> ${name}</td></tr>
      <tr><td style="padding: 10px 0;"><strong>Email:</strong> ${email}</td></tr>
      <tr><td style="padding: 10px 0;"><strong>Phone:</strong> ${phone}</td></tr>

      <tr><td style="padding: 10px 0;"><strong>Car Model:</strong> ${model}</td></tr>
      <tr><td style="padding: 10px 0;"><strong>Car Make:</strong> ${make}</td></tr>
      <tr><td style="padding: 10px 0;"><strong>Odometer Reading:</strong> ${odometer} km</td></tr>
      <tr><td style="padding: 10px 0;"><strong>Build Year:</strong> ${buildYear}</td></tr>
      <tr><td style="padding: 10px 0;"><strong>Specifications:</strong> ${specs}</td></tr>

      <tr>
        <td style="text-align: center; padding-top: 20px;">
          <p style="color: #777;">Please follow up with the user for further details.</p>
        </td>
      </tr>

      <tr>
        <td style="text-align: center; padding-top: 10px;">
          <p style="font-size: 12px; color: #999;">This is an automated email. Please do not reply.</p>
        </td>
      </tr>
    </table>
  `;
};

const SendEmail = async (req, res) => {
    try {
      const {
        name,
        email,
        phone,
        modal,make,odometer,buildYear,specs
      } = req.body;

      if (
        !name ||
        !email ||
        !phone ||
        !modal||!make||!odometer||!buildYear||!specs
      ) {
        return res
          .status(400)
          .json({ message: "All required fields must be provided" });
      }
   
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: "talalmacworld@gmail.com", 
          subject: "Car Selling Request",
          html: GetEmailTemplate(name,email,phone,modal,make,odometer,buildYear,specs),
        };
  
      await transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.error(`Error sending email:`, err.message);
          } else {
            console.log(`Email sent :`, info.response);
          }
        });
  
      res.status(201).json({
        message: "Email Send successfully",
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating campaign", error: error.message });
    }
};

module.exports ={SendEmail}