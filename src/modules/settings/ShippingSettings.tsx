import { Table, icons } from '@tabetalt/kit';
import React from 'react';
import { Box, Heading, IconButton, Text } from 'theme-ui';

const Shipping: React.FC = () => {
  const data = Array(4).fill({
    name: 'PostNord',
    price: '299,90 NOK',
    status: 'Aktiv',
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
  });
  const columns = [
    {
      Header: 'Leveringsmetode',
      accessor: 'name',
    },
    {
      Header: 'Pris',
      accessor: 'price',
    },
    {
      Header: 'Status',
      accessor: 'status',
    },
    {
      Header: '',
      accessor: 'actions',
    },
  ];
  return (
    <Box>
      <Heading>Leveringsmetoder</Heading>
      <Text sx={{ mb: 4 }}>
        Hvilke leveringsmetoder vil du tilby? Her kan du administrere, sortere,
        legge til eller slette leveringsmetoder som kundene dine kan bruke.
      </Text>
      <Table options={{ columns, data }} />
    </Box>
  );
};

export default Shipping;
