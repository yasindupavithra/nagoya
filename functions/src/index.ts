import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import nodemailer from 'nodemailer';

admin.initializeApp();
const db = admin.firestore();

const vehicleSpecs: Record<string, { cc: string; features: string[] }> = {
  'Toyota Vitz': { cc: '1000cc', features: ['Air Conditioning', 'Power Steering', 'Central Locking'] },
  'Toyota Aqua': { cc: '1500cc', features: ['Hybrid System', 'ABS', 'Cruise Control'] },
  'Nissan Note': { cc: '1200cc', features: ['Smart Key', 'Rear Camera', 'Bluetooth Audio'] },
};

export const autoFillVehicleSpecs = functions.firestore
  .document('vehicles/{vehicleId}')
  .onCreate(async (snapshot, context) => {
    const vehicle = snapshot.data();
    if (!vehicle) return;
    const key = `${vehicle.brand} ${vehicle.model}`;
    const specs = vehicleSpecs[key] || { cc: '1300cc', features: ['Power Windows', 'Audio System'] };
    await snapshot.ref.update({ cc: specs.cc, features: specs.features });
    return null;
  });

export const onInquiryReceive = functions.firestore
  .document('inquiries/{inquiryId}')
  .onCreate(async (snapshot, context) => {
    const inquiry = snapshot.data();
    if (!inquiry) return;
    const transporter = nodemailer.createTransport({
      host: 'smtp.example.com',
      port: 587,
      secure: false,
      auth: {
        user: 'your-email@example.com',
        pass: 'your-email-password',
      },
    });
    const mailOptions = {
      from: 'Nagoya Auto Auction <no-reply@nargoya.com>',
      to: 'owner@example.com',
      subject: `New inquiry for vehicle ${inquiry.vehicleId}`,
      text: `Buyer: ${inquiry.buyerName}\nPhone: ${inquiry.buyerPhone}\nType: ${inquiry.type}\nMessage: ${inquiry.message}`,
    };
    await transporter.sendMail(mailOptions);
    return null;
  });

export const nextServer = functions.https.onRequest(async (req, res) => {
  res.status(200).send('Next.js rendering should be configured through Firebase Hosting rewrites.');
});
