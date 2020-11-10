import React from 'react';
import { icons, Table } from '@tabetalt/kit';
import { Box, IconButton, Label } from 'theme-ui';
import { useMutation } from '@apollo/client';
import {
  MUTATION_DELETE_PRODUCT_CATEGORY,
  QUERY_PRODUCT_CATEGORIES_WITH_PARENT,
} from '../../../api';
import { GetProductCategories_productCategories_items } from '../../../api/types/GetProductCategories';

export interface CategoriesListingProps {
  data: GetProductCategories_productCategories_items[];
  openModal: boolean;
  setOpenModal: (value: React.SetStateAction<boolean>) => void;
  setCurrentCategory: (
    value: React.SetStateAction<GetProductCategories_productCategories_items | null>
  ) => void;
}

const CategoriesListing: React.FC<CategoriesListingProps> = ({
  data,
  openModal,
  setOpenModal,
  setCurrentCategory,
}) => {
  const [deleteCategory] = useMutation(MUTATION_DELETE_PRODUCT_CATEGORY);

  const actions = ({
    row,
  }: {
    row: { original: GetProductCategories_productCategories_items };
  }) => (
    <Box sx={{ textAlign: 'right' }}>
      <IconButton
        onClick={() => {
          deleteCategory({
            variables: { id: row.original.id },
            refetchQueries: [{ query: QUERY_PRODUCT_CATEGORIES_WITH_PARENT }],
          });
        }}
      >
        <icons.TrashIcon />
      </IconButton>
      <IconButton
        onClick={() => {
          const modalState = !openModal;
          setOpenModal(modalState);
          if (modalState) {
            setCurrentCategory(row.original);
          }
        }}
      >
        <icons.PencilIcon />
      </IconButton>
    </Box>
  );

  const menuText = ({ row }: { row: { [key: string]: any } }) => (
    <Box>
      <Label
        sx={{ color: row.original.showInMainMenu ? '#1B202E' : '#9AA0B5' }}
      >
        Hovedmeny
      </Label>
    </Box>
  );

  const parentCategoryTitle = ({
    row,
  }: {
    row: { original: GetProductCategories_productCategories_items };
  }) => (
    <Box>
      <Label>{row.original.parentCategory?.title}</Label>
    </Box>
  );

  return (
    <Table
      options={{
        columns: [
          {
            Header: 'Kategori',
            accessor: 'title',
          },
          {
            Header: 'Undergruppe av',
            accessor: 'parentCategory',
            Cell: parentCategoryTitle,
          },
          {
            Header: 'Vis i meny',
            accessor: 'showInMainMenu',
            Cell: menuText,
          },
          {
            Header: '',
            accessor: 'actions',
            Cell: actions,
          },
        ],
        data,
      }}
    />
  );
};

export default CategoriesListing;
