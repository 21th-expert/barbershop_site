import nodemailer from 'nodemailer';
import { Appointment } from './types';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

export async function sendBookingConfirmation(appointment: Appointment) {
  await transporter.sendMail({
    from: `"BarberShop" <${process.env.EMAIL_FROM}>`,
    to: appointment.clientEmail,
    subject: `Booking Confirmed – ${appointment.date} at ${appointment.time}`,
    html: `
      <div style="font-family:sans-serif;max-width:500px;margin:auto">
        <h2 style="color:#C9A84C">Your appointment is confirmed!</h2>
        <p>Hi <strong>${appointment.clientName}</strong>,</p>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Service</strong></td><td style="padding:8px;border-bottom:1px solid #eee">${appointment.serviceName}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Date</strong></td><td style="padding:8px;border-bottom:1px solid #eee">${appointment.date}</td></tr>
          <tr><td style="padding:8px"><strong>Time</strong></td><td style="padding:8px">${appointment.time}</td></tr>
        </table>
        <p style="color:#666;font-size:13px">Need to cancel? Reply to this email at least 24h in advance.</p>
      </div>
    `,
  });
}
