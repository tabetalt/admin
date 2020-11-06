import React from 'react';
import { Badge, Box, Button, Flex, Heading, Link, Text } from 'theme-ui';
import { icons, Table } from '@tabetalt/kit';
import Layout from '../../components/Layout';

const columns = [
  {
    Header: 'Produkt',
    accessor: 'name',
  },
  {
    Header: 'Pris',
    accessor: 'price',
  },
  {
    Header: 'Antall',
    accessor: 'amount',
  },
  {
    Header: 'Totalt',
    accessor: 'total',
  },
];

const data = [
  {
    name: 'Testproduktnavn',
    price: '299,90 NOK',
    amount: '1',
    total: '299,90 NOK',
  },
];

const Order: React.FC = () => (
  <Layout>
    <Box sx={{ p: 5 }}>
      <Flex sx={{ width: '100%' }}>
        <Box sx={{ flex: '7', mr: 4 }}>
          <Heading sx={{ mb: 3 }}>Oppsummering av ordre</Heading>
          <Text sx={{ mb: 4 }}>Bestilt den 27.05.2020 kl. 19:37</Text>
          <Flex
            sx={{
              mt: 4,
              pt: 4,
              borderTop: '1px solid',
              borderTopColor: 'highlight',
              '> div': {
                width: '100%',
              },
            }}
          >
            <Box>
              <Heading as="h5">Kunde</Heading>
              <Text>Simen A. W. Olsen</Text>
              <Text>so@bjerk.io</Text>
            </Box>
            <Box>
              <Heading as="h5">Betalingsadresse</Heading>
              <Text>Simen A. W. Olsen</Text>
              <Text>Ørsnesalleen 2B, 3120 Nøtterøy</Text>
            </Box>
            <Box>
              <Heading as="h5">Leveringsadresse</Heading>
              <Text>Simen A. W. Olsen</Text>
              <Text>Ørsnesalleen 2B, 3120 Nøtterøy</Text>
            </Box>
          </Flex>
          <Box sx={{ mt: 5 }}>
            <Table options={{ columns, data }} />
          </Box>
          <Box
            sx={{
              mt: 3,
              '> div': { '> div': { flex: 5, textAlign: 'right' } },
            }}
          >
            <Flex>
              <Text>Delsum</Text>
              <Text>899,70 NOK</Text>
            </Flex>
            <Flex>
              <Text>Fraktavgifter</Text>
              <Text>79,00 NOK</Text>
            </Flex>
            <Flex sx={{ mt: 4 }}>
              <Text>25% MVA</Text>
              <Text>68,00 NOK</Text>
            </Flex>
            <Flex>
              <Text>Pris eks. MVA</Text>
              <Text>978,70 NOK</Text>
            </Flex>
            <Flex>
              <Text>Pris inkl. MVA</Text>
              <Text>1 060,70 NOK</Text>
            </Flex>
            <Flex sx={{ pt: 3, '> div': { fontSize: 2 } }}>
              <Text>Totalt</Text>
              <Text>1 060,70 NOK</Text>
            </Flex>
          </Box>
        </Box>
        <Box sx={{ bg: 'gray2', flex: '3', p: 4 }}>
          <Box sx={{ mb: 5 }}>
            <Flex sx={{ width: '100%', justifyContent: 'center' }}>
              <Heading as="h3" sx={{ flexGrow: 1 }}>
                Betalingsstatus
              </Heading>
              <Badge variant="error">Ikke betalt</Badge>
            </Flex>
            <Flex sx={{ width: '100%', justifyContent: 'center', py: 3 }}>
              <Text sx={{ flexGrow: 1 }}>Betalingstype:</Text>
              <Text>Faktura</Text>
            </Flex>
            <hr />
            <Box sx={{ '> a': { mr: 2 } }}>
              <Link>Marker som sendt</Link>
              <Link>Marker som betalt</Link>
            </Box>
          </Box>
          <Box sx={{ mb: 5 }}>
            <Flex sx={{ width: '100%', justifyContent: 'center' }}>
              <Heading as="h3" sx={{ flexGrow: 1 }}>
                Ordrestatus
              </Heading>
              <Badge variant="error">Ubekreftet</Badge>
            </Flex>
            <Flex sx={{ width: '100%', justifyContent: 'center', py: 3 }}>
              <Text sx={{ flexGrow: 1 }}>Leveringsmetode:</Text>
              <Text>Hent i butikk</Text>
            </Flex>
            <hr />
            <Box sx={{ '> a': { mr: 2 } }}>
              <Link>Marker som sendt</Link>
              <Link>Marker som bekreftet</Link>
            </Box>
          </Box>
          <Box>
            <Heading as="h3" sx={{ flexGrow: 1 }}>
              Kommentar fra kunde
            </Heading>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque aliquet commodo erat non.
            </Text>
          </Box>
          <Box sx={{ mt: 5 }}>
            <Button
              variant="outline"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <Text>Slett ordre</Text>
              <icons.TrashIcon sx={{ ml: 2 }} />
            </Button>
          </Box>
        </Box>
      </Flex>
    </Box>
  </Layout>
);

export default Order;
