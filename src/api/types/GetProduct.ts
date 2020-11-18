/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProduct
// ====================================================

export interface GetProduct_product_price_formatted {
  __typename: "FormattedPrice";
  vatAmount: number | null;
  grossAmount: number;
  netAmount: number;
}

export interface GetProduct_product_price {
  __typename: "Price";
  formatted: GetProduct_product_price_formatted;
}

export interface GetProduct_product {
  __typename: "Product";
  id: number;
  tenantId: number;
  status: string;
  title: string;
  slug: string | null;
  isOnMainPage: boolean | null;
  shortDescription: string | null;
  description: string | null;
  technicalDescription: string | null;
  isAvailable: boolean | null;
  count: number | null;
  stockControl: boolean | null;
  inStockNum: number | null;
  priceId: number | null;
  price: GetProduct_product_price | null;
}

export interface GetProduct {
  product: GetProduct_product;
}

export interface GetProductVariables {
  id: number;
}
