import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import slugify from "slugify";

const prisma = new PrismaClient();

const categories = [
  "Baggy Jeans",
  "Palazzos",
  "Leggings",
  "Joggers/Sweat Pants",
  "Bodycon & Bodysuit Tops",
  "Crop Tops",
  "Basic Tops",
  "Nova Tops",
  "Halter Neck Tops",
  "Silk Skirts",
  "Boho Skirts",
  "Mini Skirts",
  "Maxi Gown/Skirts",
  "Male Wears",
  "Jeans (Thrifted)",
  "Jeans (New)",
  "Others"
];

const sampleProducts = [
  {
    name: "Satin Halter Top - Rose",
    description: "Soft satin halter top with adjustable neck tie and sleek drape.",
    price: 8500,
    category: "Halter Neck Tops",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f"
    ]
  },
  {
    name: "Baggy Jeans - Light Wash",
    description: "Relaxed fit denim with a vintage wash and comfy waist.",
    price: 12500,
    category: "Baggy Jeans",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1479064555552-3ef4979f8908"
    ]
  },
  {
    name: "Ribbed Basic Top - Cocoa",
    description: "Everyday ribbed tee with stretch and flattering fit.",
    price: 5000,
    category: "Basic Tops",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?fit=crop&w=800&q=80"
    ]
  },
  {
    name: "Flowy Palazzos - Ivory",
    description: "High-waist palazzos with soft flow and airy feel.",
    price: 11000,
    category: "Palazzos",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b"
    ]
  },
  {
    name: "Bodycon Bodysuit - Noir",
    description: "Snatched bodysuit with soft stretch and clean neckline.",
    price: 9500,
    category: "Bodycon & Bodysuit Tops",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?fit=crop&w=900&q=80"
    ]
  },
  {
    name: "Boho Midi Skirt - Terra",
    description: "Boho-inspired skirt with light pleats and easy flow.",
    price: 10500,
    category: "Boho Skirts",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?fit=crop&w=900&q=80"
    ]
  },
  {
    name: "Joggers - Cloud Gray",
    description: "Soft joggers with cuffed ankle and relaxed fit.",
    price: 9000,
    category: "Joggers/Sweat Pants",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?fit=crop&w=900&q=80"
    ]
  },
  {
    name: "Thrifted Denim - Indigo",
    description: "Thrifted denim with a timeless cut and sturdy fabric.",
    price: 8000,
    category: "Jeans (Thrifted)",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?fit=crop&w=900&q=80"
    ]
  },
  {
    name: "Nova Top - Sky",
    description: "Trendy nova top with smooth texture and bold silhouette.",
    price: 7000,
    category: "Nova Tops",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?fit=crop&w=800&q=80"
    ]
  },
  {
    name: "Male Street Tee - Black",
    description: "Classic oversized male tee with a clean finish.",
    price: 7500,
    category: "Male Wears",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?fit=crop&w=900&q=80"
    ]
  },
  {
    name: "Mini Skirt - Cherry",
    description: "Flirty mini skirt with subtle shine and flexible waist.",
    price: 6800,
    category: "Mini Skirts",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?fit=crop&w=900&q=80"
    ]
  }
];

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in the environment");
  }

  const categoryRecords = await Promise.all(
    categories.map((name) =>
      prisma.category.upsert({
        where: { slug: slugify(name, { lower: true }) },
        update: { name },
        create: { name, slug: slugify(name, { lower: true }) }
      })
    )
  );

  const adminHash = await bcrypt.hash(adminPassword, 10);
  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { passwordHash: adminHash },
    create: { email: adminEmail, passwordHash: adminHash }
  });

  for (const product of sampleProducts) {
    const category = categoryRecords.find((c) => c.name === product.category);
    if (!category) continue;

    const slug = slugify(product.name, { lower: true, strict: true });
    const existing = await prisma.product.findUnique({ where: { slug } });
    if (existing) continue;

    await prisma.product.create({
      data: {
        name: product.name,
        slug,
        description: product.description,
        price: product.price,
        featured: product.featured,
        inStock: true,
        categoryId: category.id,
        images: {
          create: product.images.map((url) => ({ url }))
        }
      }
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
