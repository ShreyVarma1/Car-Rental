/**
 * Seed script — creates 3 test users with known credentials.
 *
 * Run with:
 *   npm run seed
 *
 * Credentials after seeding:
 *   ADMIN  — admin@carrental.com   / Admin@1234
 *   OWNER  — owner@carrental.com   / Owner@1234
 *   RENTER — renter@carrental.com  / Renter@1234
 */

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, UserRole } from "../generated/prisma/client";
import * as bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

const SEED_USERS = [
  {
    name: "Admin User",
    email: "admin@carrental.com",
    password: "Admin@1234",
    role: UserRole.ADMIN,
    phone: "9000000001",
  },
  {
    name: "Car Owner",
    email: "owner@carrental.com",
    password: "Owner@1234",
    role: UserRole.OWNER,
    phone: "9000000002",
  },
  {
    name: "Test Renter",
    email: "renter@carrental.com",
    password: "Renter@1234",
    role: UserRole.RENTER,
    phone: "9000000003",
    drivingLicense: "DL-1234567890",
  },
];

async function main() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Make sure .env exists in the backend folder.",
    );
  }

  const adapter = new PrismaPg({ connectionString });
  const prisma = new PrismaClient({ adapter });

  console.log("🌱  Seeding database...\n");

  for (const user of SEED_USERS) {
    const existing = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (existing) {
      console.log(`⏭   Skipped  ${user.email}  (already exists)`);
      continue;
    }

    const passwordHash = await bcrypt.hash(user.password, SALT_ROUNDS);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        passwordHash,
        role: user.role,
        phone: user.phone,
        drivingLicense:
          "drivingLicense" in user
            ? (user as typeof user & { drivingLicense: string })
                .drivingLicense
            : undefined,
      },
    });

    console.log(`✅  Created  ${user.role.padEnd(6)}  ${user.email}`);
  }

  await prisma.$disconnect();

  console.log("\n🎉  Seed complete!\n");
  console.log("Use these credentials to log in:\n");
  console.log("  ADMIN  →  admin@carrental.com   /  Admin@1234");
  console.log("  OWNER  →  owner@carrental.com   /  Owner@1234");
  console.log("  RENTER →  renter@carrental.com  /  Renter@1234");
}

main().catch((error: unknown) => {
  console.error("❌  Seed failed:", error);
  process.exit(1);
});
