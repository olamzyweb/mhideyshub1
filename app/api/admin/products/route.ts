import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import slugify from "slugify";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const products = await prisma.product.findMany({ include: { images: true, category: true } });
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const slug = body.slug || slugify(body.name || "", { lower: true, strict: true });

  const product = await prisma.product.create({
    data: {
      name: body.name,
      slug,
      description: body.description,
      price: Number(body.price),
      categoryId: body.categoryId,
      featured: Boolean(body.featured),
      inStock: Boolean(body.inStock),
      images: {
        create: (body.images || []).map((url: string) => ({ url }))
      }
    },
    include: { images: true, category: true }
  });

  return NextResponse.json(product);
}
