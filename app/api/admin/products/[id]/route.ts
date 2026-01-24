import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  await prisma.productImage.deleteMany({ where: { productId: params.id } });

  const product = await prisma.product.update({
    where: { id: params.id },
    data: {
      name: body.name,
      slug: body.slug,
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

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await prisma.product.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
