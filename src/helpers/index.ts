import Dinero, { DineroObject } from 'dinero.js';
import { Price } from '../generated/graphql';

export const formatPrice = (
  price?: Price | null,
  isVatRequired = false
): string => {
  if (!price) return '0';

  const priceValue = (isVatRequired
    ? price.netAmount
    : price.grossAmount) as DineroObject;

  const amount = priceValue ? Dinero(priceValue).toFormat('0,0.00') : '0';
  return amount;
};

export const valueFromString = (
  value: string,
  precision = 2,
  roundRequired = false
): number => {
  const nValue = parseFloat(value.replace(',', '.')) * Math.pow(10, precision);
  if (Number.isNaN(nValue)) return 0;
  return roundRequired ? Math.round(nValue) : Math.trunc(nValue);
};
