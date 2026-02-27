import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

const IMAGES_BASE_PATH = "/images";
const hotelImages = {
  everestView: `lh5.googleusercontent.com/proxy/gHAFcz8cfS48vJv0ylAq4hNVVGxFh5yS5p9AiDvMOeN51sObt-UZdPbujO15jhNL4PnzrYFuL3x44ri1Ecnb0Ge8q6n8Vb1Rh6xeyGwSNvrt7salsMepv4xzYP6UV1nzQhaQbgPc39GZQuhz5kd1VhCPIJC6Zw=w252-h168-k-no`,
  kathmanduGrand: `lh5.googleusercontent.com/proxy/gHAFcz8cfS48vJv0ylAq4hNVVGxFh5yS5p9AiDvMOeN51sObt-UZdPbujO15jhNL4PnzrYFuL3x44ri1Ecnb0Ge8q6n8Vb1Rh6xeyGwSNvrt7salsMepv4xzYP6UV1nzQhaQbgPc39GZQuhz5kd1VhCPIJC6Zw=w252-h168-k-no`,
  himalayaLodge: `lh5.googleusercontent.com/proxy/gHAFcz8cfS48vJv0ylAq4hNVVGxFh5yS5p9AiDvMOeN51sObt-UZdPbujO15jhNL4PnzrYFuL3x44ri1Ecnb0Ge8q6n8Vb1Rh6xeyGwSNvrt7salsMepv4xzYP6UV1nzQhaQbgPc39GZQuhz5kd1VhCPIJC6Zw=w252-h168-k-no`,
  sydneyHarbor: "/sydneyHotel.jpg",
  operaHouse: `/sydneyHotel.jpg`,
  bondiBeach: `/sydneyHotel.jpg`,
};

async function main() {
  await prisma.$transaction([
    prisma.booking.deleteMany(),
    prisma.guestHotel.deleteMany(),
    prisma.guestPassport.deleteMany(),
    prisma.newDeal.deleteMany(),
    prisma.guest.deleteMany(),
    prisma.hotel.deleteMany(),
    prisma.admin.deleteMany(),
  ]);

  const adminPassword = await hash("admin123", 10);
  const admins = await Promise.all([
    prisma.admin.create({
      data: {
        name: "Admin User",
        email: "admin@hotel.com",
        password: adminPassword,
      },
    }),
    prisma.admin.create({
      data: {
        name: "Super Admin",
        email: "superadmin@hotel.com",
        password: await hash("superadmin123", 10),
      },
    }),
  ]);

  const hotels = await Promise.all([
    prisma.hotel.create({
      data: {
        name: "The Everest View",
        location: "Kathmandu",
        hotelImage: hotelImages.everestView,
        features: [
          "Mountain View",
          "Spa",
          "Restaurant",
          "WiFi",
          "Hiking Tours",
          "Oxygen Support",
        ],
        ratings: 5,
      },
    }),
    prisma.hotel.create({
      data: {
        name: "Kathmandu Grand Hotel",
        location: "Kathmandu",
        hotelImage: hotelImages.kathmanduGrand,
        features: [
          "City View",
          "Pool",
          "Temple Tours",
          "Traditional Restaurant",
          "Yoga Center",
        ],
        ratings: 4,
      },
    }),
    prisma.hotel.create({
      data: {
        name: "Himalaya Lodge",
        location: "Kathmandu",
        hotelImage: hotelImages.himalayaLodge,
        features: [
          "Mountain View",
          "Trekking Guide",
          "Local Cuisine",
          "Cultural Shows",
          "Meditation Center",
        ],
        ratings: 4,
      },
    }),
    prisma.hotel.create({
      data: {
        name: "Sydney Harbor Hotel",
        location: "Sydney",
        hotelImage: hotelImages.sydneyHarbor,
        features: [
          "Harbor View",
          "Beach Access",
          "Restaurant",
          "Bar",
          "Surfing Lessons",
          "Yacht Tours",
        ],
        ratings: 5,
      },
    }),
    prisma.hotel.create({
      data: {
        name: "Opera House View",
        location: "Sydney",
        hotelImage: hotelImages.operaHouse,
        features: [
          "Opera House View",
          "Luxury Spa",
          "Fine Dining",
          "Concert Tickets",
          "Harbor Cruises",
        ],
        ratings: 5,
      },
    }),
    prisma.hotel.create({
      data: {
        name: "Bondi Beach Resort",
        location: "Sydney",
        hotelImage: hotelImages.bondiBeach,
        features: [
          "Beachfront",
          "Surf School",
          "Beach Bar",
          "BBQ Area",
          "Fitness Center",
        ],
        ratings: 4,
      },
    }),
  ]);

  const guestPassword = await hash("guest123", 10);
  const guests = await Promise.all([
    prisma.guest.create({
      data: {
        name: "John Doe",
        email: "john@example.com",
        password: guestPassword,
        dateOfBirth: new Date("1990-01-15"),
        phoneNumber: "+1234567890",
        language: "English",
        work: "Software Engineer",
        address: "123 Main St, New York",
        guestPassport: {
          create: {
            passportNumber: "US123456",
            passportIssueDate: new Date("2020-01-01"),
            passportExpiryDate: new Date("2030-01-01"),
            dateOfBirth: new Date("1990-01-15"),
            placeOfBirth: "New York",
            passportCountry: "USA",
          },
        },
      },
    }),
    prisma.guest.create({
      data: {
        name: "Emma Wilson",
        email: "emma@example.com",
        password: guestPassword,
        dateOfBirth: new Date("1995-03-20"),
        phoneNumber: "+9876543210",
        language: "English",
        work: "Doctor",
        address: "456 Park Ave, Sydney",
        guestPassport: {
          create: {
            passportNumber: "AU987654",
            passportIssueDate: new Date("2019-06-01"),
            passportExpiryDate: new Date("2029-06-01"),
            dateOfBirth: new Date("1995-03-20"),
            placeOfBirth: "Melbourne",
            passportCountry: "Australia",
          },
        },
      },
    }),
  ]);

  const currentDate = new Date();
  const deals = await Promise.all([
    prisma.newDeal.create({
      data: {
        validTill: new Date(currentDate.setMonth(currentDate.getMonth() + 3)),
        location: "Kathmandu",
        hotelId: hotels[0].id,
        packageCost: 1500,
        guestsEnrolled: {
          connect: { id: guests[0].id },
        },
      },
    }),
    prisma.newDeal.create({
      data: {
        validTill: new Date(currentDate.setMonth(currentDate.getMonth() + 2)),
        location: "Sydney",
        hotelId: hotels[3].id,
        packageCost: 2000,
        guestsEnrolled: {
          connect: { id: guests[1].id },
        },
      },
    }),
  ]);

  const bookings = await Promise.all([
    prisma.booking.create({
      data: {
        date: new Date(currentDate.setDate(currentDate.getDate() + 30)),
        checkoutDate: new Date(currentDate.setDate(currentDate.getDate() + 35)),
        status: "confirmed",
        location: "Kathmandu",
        guestId: guests[0].id,
        hotelId: hotels[0].id,
        cost: 800,
      },
    }),
    prisma.booking.create({
      data: {
        date: new Date(currentDate.setDate(currentDate.getDate() + 60)),
        checkoutDate: new Date(currentDate.setDate(currentDate.getDate() + 65)),
        status: "confirmed",
        location: "Sydney",
        guestId: guests[1].id,
        hotelId: hotels[3].id,
        cost: 1200,
      },
    }),
  ]);

  await Promise.all([
    prisma.guestHotel.create({
      data: {
        guestId: guests[0].id,
        hotelId: hotels[0].id,
      },
    }),
    prisma.guestHotel.create({
      data: {
        guestId: guests[0].id,
        hotelId: hotels[1].id,
      },
    }),
    prisma.guestHotel.create({
      data: {
        guestId: guests[1].id,
        hotelId: hotels[3].id,
      },
    }),
    prisma.guestHotel.create({
      data: {
        guestId: guests[1].id,
        hotelId: hotels[4].id,
      },
    }),
  ]);

  console.log("✅ Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
