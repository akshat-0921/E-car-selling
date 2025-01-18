import nodemailer from "nodemailer";

export const mailSender = async (to, subject, htmlContent) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"E-Car Support" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html: htmlContent,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email. Please try again later.");
    }
};
