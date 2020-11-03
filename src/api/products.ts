import { gql } from '@apollo/client';
import { FRAGMENT_PRODUCT_FIELDS_SHORT } from './fragments';

export const QUERY_GET_PRODUCTS = gql`
  query GetProducts {
    products {
      items {
        ...ProductFieldsShort
      }
    }
  }
  ${FRAGMENT_PRODUCT_FIELDS_SHORT}
`;
