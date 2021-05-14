import { Field } from '@tabetalt/kit';
import React, { MutableRefObject, useCallback, useRef } from 'react';
import Layout from '../../components/layout/Layout';
import {
  Form,
  Formik,
  FormikHelpers,
  useFormik,
  useFormikContext,
} from 'formik';
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Label,
  Select,
  Text,
} from 'theme-ui';
import {
  TenantPriceDisplay,
  SocialMedia,
  EmailAddress,
  Address,
  StoreUrl,
  TrackingTag,
} from '../../generated/graphql';
import { TenantItem } from '../../context/TenantsContext';
import { SettingsNavigation } from './SettingsNavigation';
import { FormField } from '../../components/common/FormField';
import { FormSelect } from '../../components/common/FormSelect';
import { FormInput } from '../../components/common/FormInput';

interface GeneralSettingsProps {
  tenant?: TenantItem | null;
  // onSubmit: (
  //   values: GeneralSettingsValues,
  //   formikHelpers: FormikHelpers<GeneralSettingsValues>
  // ) => void;
  // error?: boolean;
}

interface GeneralSettingsValues {
  priceDisplay: TenantPriceDisplay;
  title: string;
  displayName: string;
  url: string;
  languageCode: string;
  emailAddresses?: EmailAddress[];
  addresses?: Address[];
  socialMedias?: SocialMedia[];
  trackingTags?: TrackingTag[];
  storeUrls?: StoreUrl[];
}

export const GeneralSettings: React.FC<GeneralSettingsProps> = ({ tenant }) => {
  // const form = useFormik<GeneralSettingsValues>({
  //   initialValues: {
  //     ...tenant,
  //   } as GeneralSettingsValues,
  //   // validationSchema: ProductSchema,
  //   onSubmit,
  // });

  const ref: MutableRefObject<any> = useRef();
  // const onSubmit = useCallback(
  //   async (values) => {
  //     const input = _.omit({ tenantId: 1, ...data?.product, ...values }, [
  //       'id',
  //       '__typename',
  //       'price',
  //       'categories',
  //     ]) as ProductUpdateInput;

  //     if (values.price) {
  //       input.price = {
  //         grossAmount: DineroHelper.moneyFromString(values.price),
  //       };
  //     }
  //     if (values.categories) {
  //       input.categories = (values.categories as TagProps[]).map(
  //         ({ id, name }) => ({ id: id as number, title: name })
  //       );
  //     }
  //     if (values.images) {
  //       input.images = values.images.map(({ url }: { url: string }) => ({
  //         url,
  //       }));
  //     }
  //     await updateProduct({ variables: { id: productId, input } });
  //     navigate(`/catalog/products`, {
  //       replace: true,
  //     });
  //   },
  //   [productId, data, updateProduct]
  // );

  if (!tenant)
    return (
      <Layout
        header={{
          links: [
            {
              name: 'Innstillinger',
              to: '/settings/general',
            },
          ],
        }}
      >
        <Box sx={{ maxWidth: 820 }}>
          <Heading>No tenant loaded</Heading>
        </Box>
      </Layout>
    );

  return (
    <Formik
      initialValues={{
        title: tenant.title,
        url: tenant.url,
        lang: tenant.languageCode,
        vatSats: tenant.priceDisplay,
        vat: tenant.priceDisplay,
        companyName: tenant.displayName,
        companyAddress: '',
        postalCode: '',
        postalAddress: '',
        vatNumber: '',
        email: '',
        angrerettskjema: '',
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
        trackingId: '',
      }}
      // validationSchema={{}}
      onSubmit={async (values, { setSubmitting }) => {
        console.log(values);
      }}
    >
      <Layout
        header={{
          links: [
            {
              name: 'Innstillinger',
              to: '/settings/general',
            },
          ],
          children: (
            <Box>
              <Button
                onClick={() => {
                  ref.current.dispatchEvent(new Event('submit'));
                }}
              >
                Lagre endringer
              </Button>
            </Box>
          ),
        }}
      >
        <Box sx={{ p: 5 }}>
          <SettingsNavigation />

          <Form ref={ref}>
            <Box sx={{ maxWidth: 820 }}>
              <Heading>Butikkinformasjon</Heading>
              <Box sx={{ '>div': { mb: 3 } }}>
                <FormField name="title" label="Navn på butikken" />
                <FormField name="url" label="Butikkens URL" />
                {/* <Field label="Navn på butikken" name="title" /> */}
                {/* <Field label="Butikkens URL" name="url" /> */}
                <Flex sx={{ alignItems: 'center' }}>
                  <Label htmlFor="" sx={{ width: 'auto', minWidth: '7.75rem' }}>
                    Språk
                  </Label>
                  <Box sx={{ flex: 5, ml: 3 }}>
                    <FormSelect name="lang" options={['Norsk', 'ru', 'en']} />
                    {/* <Select name="lang" sx={{ width: '100%' }}>
                      <option>Norsk</option>
                      <option>Ru</option>
                    </Select> */}
                  </Box>
                </Flex>
                <FormField name="vatSats" label="MVA-sats" />
                {/* <Field
                  label="MVA-sats"
                  name="vatSats"
                  value={tenant.priceDisplay}
                /> */}
                <Flex sx={{ alignItems: 'center' }}>
                  <Label htmlFor="" sx={{ width: 'auto', minWidth: '8.75rem' }}>
                    Pris og valuta
                  </Label>
                  <Box sx={{ flex: 5 }}>
                    <FormSelect
                      name="vat"
                      options={['Inkl. MVA', 'Eksl. MVA']}
                    />
                    {/* <Select
                      name="vat"
                      value={tenant.priceDisplay}
                      sx={{ width: '100%' }}
                    >
                      <option value={TenantPriceDisplay.IncVat}>
                        Inkl. MVA
                      </option>
                      <option value={TenantPriceDisplay.ExlVat}>
                        Eksl. MVA
                      </option>
                    </Select> */}
                  </Box>
                  <Box sx={{ flex: 5, ml: 3 }}>
                    <FormSelect name="currency" options={['NOK']} />
                    {/* <Select name="currency" sx={{ width: '100%' }}>
                      <option>NOK</option>
                    </Select> */}
                  </Box>
                  {/* <Field label="Språk" name="lang" placeholder="Velg språk" as={Select}>
            <option>Hello</option>
          </Field> */}
                </Flex>
              </Box>
              <Heading>Kontaktinformasjon</Heading>
              <Text sx={{ mb: 3 }}>
                Denne informasjonen vises i nettbutikken, samt på kvitteringer
                og ordrebekreftelser.
              </Text>
              <Box sx={{ '>div': { mb: 3, mt: 3 } }}>
                <FormField name="companyName" label="Firmanavn" />
                {/* <Field
                  label="Firmanavn"
                  name="companyName"
                  value={tenant.displayName}
                /> */}
                <FormField name="companyAddress" label="Gateadresse" />
                {/* <Field label="Gateadresse" name="companyAddress" value="" /> */}
                <Flex sx={{ alignItems: 'center' }}>
                  <Label htmlFor="" sx={{ width: 'auto', minWidth: '8.75rem' }}>
                    Postnr. og sted
                  </Label>
                  <Box sx={{ flex: 3 }}>
                    <FormInput name="postalCode" placeholder="1234" />
                    {/* <Input name="postalCode" placeholder="1234" /> */}
                  </Box>
                  <Box sx={{ flex: 8, ml: 3 }}>
                    <FormInput name="postalAddress" placeholder="Sted" />
                    {/* <Input name="postalAddress" placeholder="Sted" /> */}
                  </Box>
                </Flex>
                <FormField
                  name="vatNumber"
                  label="Evnt. org.nummer"
                  placeholder="NO 123 456 789 MVA"
                />
                {/* <Field
                  label="Evnt. org.nummer"
                  name="vatNumber"
                  placeholder="NO 123 456 789 MVA"
                  value=""
                /> */}
                <FormField
                  name="email"
                  label="Kontakt e-post"
                  placeholder="epostadresse@post.no"
                />
                {/* <Field
                  label="Kontakt e-post"
                  name="email"
                  placeholder="epostadresse@post.no"
                  value=""
                /> */}
              </Box>
              <Heading>Angrerettskjema</Heading>
              <Text sx={{ mb: 3 }}>
                Angrerettsskjemaet vil etter opplastning bli vedlagt med
                ordrebekreftelsen til kunden. Husk å legg inn din virksomhets
                informasjon på skjemaet. Du kan laste ned standard norsk
                angrerettsskjema og fylle inn dine detaljer. Les mer om kundens
                rettigheter og angrerettsskjema.
              </Text>
              <Box sx={{ '>div': { mb: 3 } }}>
                <FormField name="angrerettskjema" label="Last opp" />
                {/* <Field label="Last opp" name="angrerettskjema" value="" /> */}
              </Box>
              <Heading>Sosiale Medier</Heading>
              <Text sx={{ mb: 3 }}>
                Denne informasjonen vises i footer i nettbutikken.
              </Text>
              <Box sx={{ '>div': { mb: 3 } }}>
                <FormField name="facebook" label="Facebook" />
                {/* <Field
                  label="Facebook"
                  name="facebook"
                /> */}

                <FormField name="twitter" label="Twitter" />
                {/* <Field
                  label="Twitter"
                  name="twitter"
                  value={tenant.socialMedias.twitter}
                /> */}
                {/* <FormField name="googlePlus" label="Google +" /> */}
                {/* <Field
                  label="Google +"
                  name="googlePlus"
                  value={tenant.googlePlus}
                /> */}
                <FormField name="instagram" label="Instagram" />
                {/* <Field
                  label="Instagram"
                  name="instagram"
                  value={tenant.instagram}
                /> */}
                <FormField name="linkedin" label="LinkedIn" />
                {/* <Field
                  label="LinkedIn"
                  name="linkedin"
                  value={tenant.linkedin}
                /> */}
              </Box>
              <Heading>Google Analytics</Heading>
              <Text sx={{ mb: 3 }}>
                Koble nettbutikken din opp mot Google Analytics.
              </Text>
              <Box sx={{ '>div': { mb: 3 } }}>
                <FormField name="trackingId" label="Tracking-ID" />
                {/* <Field
                  label="Tracking-ID"
                  name="trackingId"
                  // value={tenant.trackingId}
                /> */}
              </Box>
            </Box>
            {/* <Box sx={{ border: '1px solid', m: 5, p: 5, borderColor: 'error' }}>
              <Heading sx={{ fontWeight: 'normal', mb: 4 }}>FARESONEN</Heading>
              <Flex>
                 <Box sx={{ flex: 1 }}>
                  <Heading as="h4" sx={{ fontWeight: 'normal' }}>
                    Deaktivér nettbutikken
                  </Heading>
                  <Text sx={{ mb: 3, color: 'muted' }}>
                    Dersom du deaktiverer nettbutikken vil den skjules, men
                    kostnadene fortsetter å løpe.
                  </Text>
                  <Button
                    variant="outline"
                    sx={{
                      boxShadow:
                        'inset 0 0 0 3px var(--theme-ui-colors-error, #E03B54)',
                    }}
                  >
                    Deaktivér nettbutikken
                  </Button>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Heading as="h4" sx={{ fontWeight: 'normal' }}>
                    Overfør nettbutikken
                  </Heading>
                  <Text sx={{ mb: 3, color: 'muted' }}>
                    Ønsker du å overføre nettbutikken til en annen person? Dette
                    kan du gjøre under.
                  </Text>
                  <Button
                    variant="outline"
                    sx={{
                      boxShadow:
                        'inset 0 0 0 3px var(--theme-ui-colors-error, #E03B54)',
                    }}
                  >
                    Overfør nettbutikken
                  </Button>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Heading as="h4" sx={{ fontWeight: 'normal' }}>
                    Slett min nettbutikk
                  </Heading>
                  <Text sx={{ mb: 3, color: 'muted' }}>
                    Dersom du sletter nettbutikken din fjernes alt innhold og
                    historikk, og nettbutikken slettes.
                  </Text>
                  <Button
                    sx={{
                      bg: 'red',
                    }}
                  >
                    Slett min nettbutikk
                  </Button>
                </Box>

              </Flex>
            </Box>
           */}
          </Form>
        </Box>
      </Layout>
    </Formik>
  );
};
