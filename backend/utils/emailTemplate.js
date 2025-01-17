export const otpTemplate = (otp) => {
    return `
      <div style="font-family: Arial, sans-serif; color: #333; text-align: center; padding: 20px;">
        <h1 style="color: #4CAF50;">Your OTP Code</h1>
        <p style="font-size: 18px;">Use the code below to complete your registration process:</p>
        <div style="font-size: 24px; font-weight: bold; margin: 20px 0; color: #000;">${otp}</div>
        <p style="font-size: 14px; color: #888;">This code is valid for 10 minutes. Do not share it with anyone.</p>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
        <p style="font-size: 12px; color: #aaa;">If you did not request this code, please ignore this email.</p>
      </div>
    `;
};