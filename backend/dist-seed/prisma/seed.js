"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("../generated/prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const SALT_ROUNDS = 12;
const SEED_USERS = [
    {
        name: "Admin User",
        email: "admin@carrental.com",
        password: "Admin@1234",
        role: client_1.UserRole.ADMIN,
        phone: "9000000001",
    },
    {
        name: "Car Owner",
        email: "owner@carrental.com",
        password: "Owner@1234",
        role: client_1.UserRole.OWNER,
        phone: "9000000002",
    },
    {
        name: "Test Renter",
        email: "renter@carrental.com",
        password: "Renter@1234",
        role: client_1.UserRole.RENTER,
        phone: "9000000003",
        drivingLicense: "DL-1234567890",
    },
];
async function main() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        throw new Error("DATABASE_URL is not set. Make sure .env exists in the backend folder.");
    }
    const adapter = new adapter_pg_1.PrismaPg({ connectionString });
    const prisma = new client_1.PrismaClient({ adapter });
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
                drivingLicense: "drivingLicense" in user
                    ? user
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
main().catch((error) => {
    console.error("❌  Seed failed:", error);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map