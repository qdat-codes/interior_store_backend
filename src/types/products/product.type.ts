import { Document, Types } from "mongoose";

export interface ProductType extends Document {
  name: string;
  price: number;
  categoryId: Types.ObjectId;
  images: string[];
  stock: number;
  discountPrice: number;
  description: string;
  colors: string[];
  sizes: string[];
  overview: TOverviewSection[];

}

export type TOverviewRow = { label: string; value: string }
export type TOverviewSection = { title: string; rows: TOverviewRow[] }

