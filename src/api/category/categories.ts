import { gql } from '@apollo/client';
import { FRAGMENT_PRODUCT_CATEGORY_FIELDS } from '../fragments';

export const QUERY_GET_CATEGORIES = gql`
  query GetCategories {
    productCategories {
      items {
        ...ProductCategory
      }
    }
  }
  ${FRAGMENT_PRODUCT_CATEGORY_FIELDS}
`;
