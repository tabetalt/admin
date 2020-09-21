import { Table, icons } from '@tabetalt/kit';
import React from 'react';
import { Box, Heading, IconButton, Text } from 'theme-ui';
import Layout from '../../components/Layout';

const DiscountSettings = () => (
  <Layout>
    <Box sx={{ m: 5 }}>
      <Heading>Rabatter</Heading>
      <Text sx={{ mb: 4 }}>
        Her kan du administrere, sortere, legge til eller slette rabatter og
        rabattkoder som kundene dine kan bruke.
      </Text>
      <Table
        columns={[
          {
            Header: 'Rabattnavn',
            accessor: 'name',
          },
          {
            Header: 'Tilbud',
            accessor: 'offer',
          },
          {
            Header: 'Rabattkode',
            accessor: 'offerCode',
          },
          {
            Header: 'Status',
            accessor: 'status',
          },
          {
            Header: 'Brukt',
            accessor: 'usedNum',
          },
          {
            Header: '',
            accessor: 'actions',
          },
        ]}
        data={Array(10).fill({
          name: 'Sommerkampanje',
          offer: '- 20%',
          offerCode: 'AVLSAGKODERABATT',
          status: 'Aktiv',
          usedNum: '134',
          actions: (
            <Box sx={{ textAlign: 'right' }}>
              <IconButton>
                <icons.TrashIcon />
              </IconButton>
              <IconButton>
                <icons.PencilIcon />
              </IconButton>
            </Box>
          ),
        })}
      />
    </Box>
  </Layout>
);

export default DiscountSettings;
