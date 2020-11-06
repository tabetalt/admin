import { gql } from '@apollo/client';

export const FRAGMENT_TENANT = gql`
  fragment Tenant on Tenant {
    id
  }
`;

export const FRAGMENT_PRICE = gql`
  fragment Price on Price {
    vatAmount
    grossAmount
    netAmount
  }
`;

export const FRAGMENT_PRODUCT_VARIANT = gql`
  fragment ProductVariantFileds on ProductVariant {
    id
  }
`;

export const FRAGMENT_PRODUCT_ATTRIBUTE = gql`
  fragment ProductAttribute on ProductAttribute {
    id
  }
`;

export const FRAGMENT_PRODUCT_CATEGORY = gql`
  fragment ProductCategoryFields on ProductCategory {
    id
    title
    status
    parentCategoryId
    menuNavigation
  }
`;

export const FRAGMENT_PARENT_PRODUCT_CATEGORY = gql`
  fragment ParentCategoryFields on ProductCategory {
    id
    title
  }
`;

export const FRAGMENT_PRODUCT_SHORT = gql`
  fragment ProductShort on Product {
    id
    status
    title
    slug
    isOnMainPage
    shortDescription
    description
    technicalDescription
    isAvailable
    count
  }
`;

export const FRAGMENT_PRODUCT = gql`
  fragment Product on Product {
    ...ProductShort
    price {
      ...Price
    }
    variants {
      ...ProductVariantFileds
    }
    attributes {
      ...ProductAttribute
    }
    categories {
      ...ProductCategoryFields
    }
    tenant {
      ...Tenant
    }
  }
  ${FRAGMENT_PRODUCT_SHORT}
  ${FRAGMENT_PRICE}
  ${FRAGMENT_PRODUCT_VARIANT}
  ${FRAGMENT_PRODUCT_ATTRIBUTE}
  ${FRAGMENT_PRODUCT_CATEGORY}
  ${FRAGMENT_TENANT}
`;
