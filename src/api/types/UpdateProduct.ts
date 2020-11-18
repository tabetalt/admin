/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductUpdateInput } from './globalTypes';

// ====================================================
// GraphQL mutation operation: UpdateProduct
// ====================================================

export interface UpdateProduct_updateProduct_price_formatted {
  __typename: 'FormattedPrice';
  vatAmount: number | null;
  grossAmount: number;
  netAmount: number;
}

export interface UpdateProduct_updateProduct_price {
  __typename: 'Price';
  formatted: UpdateProduct_updateProduct_price_formatted;
}

export interface UpdateProduct_updateProduct {
  __typename: 'Product';
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
  price: UpdateProduct_updateProduct_price | null;
}

export interface UpdateProduct {
  updateProduct: UpdateProduct_updateProduct;
}

export interface UpdateProductVariables {
  id: number;
  input: ProductUpdateInput;
}
