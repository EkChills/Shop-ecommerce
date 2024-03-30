import { db } from '@/server/db';
import {product, type Product } from '@/server/db/schema';
import { sql } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import React from 'react'


interface PageProps {
    searchParams: {
      query:string;
    }
  }
  
  export type CoreProduct = Omit<Product, 'createdAt' | 'updatedAt'>

export default async function page({searchParams}:PageProps) {
    const query = searchParams.query

    if(Array.isArray(query) || !query) {
        redirect('/')
    }

    const allProducts:CoreProduct[] = await db
    .select()
    .from(product)
    .where(
      sql`to_tsvector('simple', lower(${product.name} || ' ' || ${
        product.description
      })) @@ to_tsquery('simple', lower(${query
        .trim()
        .split(' ')
        .join(' & ')}))`
    )
    .limit(3)

    console.log(allProducts);
    

  return (
    <div>

    </div>
  )
}
