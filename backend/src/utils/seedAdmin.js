import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
import bcrypt from "bcryptjs";
import { connectToDB } from "../config/db.js";
import userModel from "../model/user.model.js";

async function seedAdmin() {
  try {
    await connectToDB();

    const adminEmail = "admin@gmail.com";
    const adminPassword = "admin123";
    const passwordHash = await bcrypt.hash(adminPassword, 10);

    const existingAdmin = await userModel.findOne({ email: adminEmail });

    if (existingAdmin) {
      existingAdmin.name = "Admin";
      existingAdmin.role = "seller";
      existingAdmin.passwordHash = passwordHash;
      await existingAdmin.save();
      console.log(`[SUCCESS] Admin user (${adminEmail}) updated successfully with role: 'seller'.`);
    } else {
      await userModel.create({
        name: "Admin",
        email: adminEmail,
        passwordHash,
        role: "seller"
      });
      console.log(`[SUCCESS] Admin user (${adminEmail}) created successfully with role: 'seller'.`);
    }

    process.exit(0);
  } catch (error) {
    console.error("[ERROR] Failed to seed admin user:", error);
    process.exit(1);
  }
}

seedAdmin();
