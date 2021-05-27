import React, { MutableRefObject, useCallback, useRef } from 'react';
import Layout from '../../components/layout/Layout';
import { Form, Formik } from 'formik';
import { Box, Button, Flex, Heading, Label, Text } from 'theme-ui';
import {
  TenantPriceDisplay,
  TenantUpdateInput,
  useUpdateTenantMutation,
  SocialMediaType,
  CurrencyCode,
} from '../../generated/graphql';
import * as DineroHelper from '../../helpers';
import { TenantItem } from '../../context/TenantContext';
import { SettingsNavigation } from './SettingsNavigation';
import { FormField } from '../../components/common/FormField';
import { FormSelect } from '../../components/common/FormSelect';
import { FormInput } from '../../components/common/FormInput';
import { useTenant } from '../../context/TenantContext';
import * as Yup from 'yup';

interface GeneralSettingsProps {
  tenant?: TenantItem | null;
}

const TenantSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(255, 'Too Long!')
    .required('Required!'),
  url: Yup.string()
    .min(2, 'Too Short!')
    .max(255, 'Too Long!')
    .url('Must be a url')
    .required('Required!'),
  languageCode: Yup.string().required('Required!'),
  vatRateAmount: Yup.number().required('Required!'),
  vatRateCurrency: Yup.string().required('Required!'),
  displayName: Yup.string().required('Required!'),
  priceDisplay: Yup.string().required('Required!'),
  address: Yup.string().min(2, 'Too Short!').max(255, 'Too Long!'),
  postalCode: Yup.string(),
  postalAddress: Yup.string().min(2, 'Too Short!').max(255, 'Too Long!'),
  orgNumber: Yup.string().min(2, 'Too Short!').max(255, 'Too Long!'),
  email: Yup.string().email('Must be a email'),
  facebook: Yup.string().min(2, 'Too Short!').max(255, 'Too Long!').url(),
  twitter: Yup.string().min(2, 'Too Short!').max(255, 'Too Long!').url(),
  instagram: Yup.string().min(2, 'Too Short!').max(255, 'Too Long!').url(),
  linkedin: Yup.string().min(2, 'Too Short!').max(255, 'Too Long!').url(),
});

export const GeneralSettings: React.FC<GeneralSettingsProps> = ({ tenant }) => {
  const { updateRequired } = useTenant();
  const ref: MutableRefObject<any> = useRef();

  const [updateTenant, { error }] = useUpdateTenantMutation({});

  const onSubmitGeneral = useCallback(
    async (input) => {
      await updateTenant({ variables: { id: tenant?.id || 1, input } });
      if (updateRequired) updateRequired();
    },
    [updateTenant]
  );

  const findSocialMediaByName = (type: SocialMediaType) => {
    return tenant?.socialMedias?.find((item) => item.type === type)?.url || '';
  };

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
        title: tenant.title || '',
        url: tenant.url || '',
        languageCode: tenant.languageCode || '',
        vatRateAmount: DineroHelper.formatMoney(tenant.vatRate?.value),
        vatRateCurrency: tenant.vatRate?.value.currency || CurrencyCode.Nok,
        priceDisplay: tenant.priceDisplay,
        displayName: tenant.displayName || '',
        address: tenant.address || '',
        postalCode: tenant.postalCode || '',
        postalAddress: tenant.postalAddress || '',
        orgNumber: tenant.orgNumber || '',
        email: tenant.email || '',
        facebook: findSocialMediaByName(SocialMediaType.Facebook) || '',
        twitter: findSocialMediaByName(SocialMediaType.Twitter) || '',
        instagram: findSocialMediaByName(SocialMediaType.Instagram) || '',
        linkedin: findSocialMediaByName(SocialMediaType.Linkedin) || '',
      }}
      validationSchema={TenantSchema}
      onSubmit={async (values) => {
        const input: TenantUpdateInput = {
          priceDisplay: values.priceDisplay,
          title: values.title,
          displayName: values.displayName,
          url: values.url,
          languageCode: values.languageCode,
          email: values.email,
          address: values.address,
          postalCode: values.postalCode,
          postalAddress: values.postalAddress,
          orgNumber: values.orgNumber,
          socialMedias: [
            { type: SocialMediaType.Facebook, url: values.facebook },
            { type: SocialMediaType.Instagram, url: values.instagram },
            { type: SocialMediaType.Linkedin, url: values.linkedin },
            { type: SocialMediaType.Twitter, url: values.twitter },
          ],
          vatRate: {
            value: DineroHelper.moneyFromString(
              values.vatRateAmount.toString(),
              2,
              values.vatRateCurrency
            ),
          },
        };
        onSubmitGeneral(input);
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
          {error && <p>error</p>}
          <Form ref={ref}>
            <Box sx={{ maxWidth: 820 }}>
              <Heading>Butikkinformasjon</Heading>
              <Box sx={{ '>div': { mb: 3 } }}>
                <FormField name="title" label="Navn på butikken" />
                <FormField name="url" label="Butikkens URL" />
                <Flex sx={{ alignItems: 'center' }}>
                  <Label htmlFor="" sx={{ width: 'auto', minWidth: '7.75rem' }}>
                    Språk
                  </Label>
                  <Box sx={{ flex: 5, ml: 3 }}>
                    <FormSelect
                      name="languageCode"
                      options={['Norsk', 'ENG']}
                    />
                  </Box>
                </Flex>
                <FormField
                  name="vatRateAmount"
                  type="number"
                  label="MVA-sats"
                />
                <Flex sx={{ alignItems: 'center' }}>
                  <Label htmlFor="" sx={{ width: 'auto', minWidth: '8.75rem' }}>
                    Pris og valuta
                  </Label>
                  <Box sx={{ flex: 5 }}>
                    <FormSelect
                      name="priceDisplay"
                      options={[
                        TenantPriceDisplay.IncVat,
                        TenantPriceDisplay.ExlVat,
                      ]}
                      labels={['Inkl. MVA', 'Eksl. MVA']}
                    />
                  </Box>
                  <Box sx={{ flex: 5, ml: 3 }}>
                    <FormSelect
                      name="vatRateCurrency"
                      options={Object.values(CurrencyCode)}
                    />
                  </Box>
                </Flex>
              </Box>
              <Heading>Kontaktinformasjon</Heading>
              <Text sx={{ mb: 3 }}>
                Denne informasjonen vises i nettbutikken, samt på kvitteringer
                og ordrebekreftelser.
              </Text>
              <Box sx={{ '>div': { mb: 3, mt: 3 } }}>
                <FormField name="displayName" label="Firmanavn" />
                <FormField name="address" label="Gateadresse" />
                <Flex sx={{ alignItems: 'center' }}>
                  <Label htmlFor="" sx={{ width: 'auto', minWidth: '8.75rem' }}>
                    Postnr. og sted
                  </Label>
                  <Box sx={{ flex: 3 }}>
                    <FormInput
                      name="postalCode"
                      type="number"
                      placeholder="1234"
                    />
                  </Box>
                  <Box sx={{ flex: 8, ml: 3 }}>
                    <FormInput name="postalAddress" placeholder="Sted" />
                  </Box>
                </Flex>
                <FormField
                  name="orgNumber"
                  label="Evnt. org.nummer"
                  placeholder="NO 123 456 789 MVA"
                />
                <FormField
                  name="email"
                  label="Kontakt e-post"
                  placeholder="epostadresse@post.no"
                />
              </Box>
              {/* <Heading>Angrerettskjema</Heading>
              <Text sx={{ mb: 3 }}>
                Angrerettsskjemaet vil etter opplastning bli vedlagt med
                ordrebekreftelsen til kunden. Husk å legg inn din virksomhets
                informasjon på skjemaet. Du kan laste ned standard norsk
                angrerettsskjema og fylle inn dine detaljer. Les mer om kundens
                rettigheter og angrerettsskjema.
              </Text>
              <Box sx={{ '>div': { mb: 3 } }}>
                <FormField name="angrerettskjema" label="Last opp" />
                <Field label="Last opp" name="angrerettskjema" value="" />
              </Box>*/}
              <Heading>Sosiale Medier</Heading>
              <Text sx={{ mb: 3 }}>
                Denne informasjonen vises i footer i nettbutikken.
              </Text>
              <Box sx={{ '>div': { mb: 3 } }}>
                <FormField name="facebook" label="Facebook" />
                <FormField name="twitter" label="Twitter" />
                {/* <FormField name="googlePlus" label="Google +" /> */}
                <FormField name="instagram" label="Instagram" />
                <FormField name="linkedin" label="LinkedIn" />
              </Box>
              {/* <Heading>Google Analytics</Heading>
              <Text sx={{ mb: 3 }}>
                Koble nettbutikken din opp mot Google Analytics.
              </Text> */}
              {/* <Box sx={{ '>div': { mb: 3 } }}>
                <FormField name="trackingId" label="Tracking-ID" />
              </Box> */}
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
