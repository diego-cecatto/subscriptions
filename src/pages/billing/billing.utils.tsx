import { BillingData } from './billing';

export const generateDescription = (formData: BillingData) => {
    let {
        initialPrice,
        billingFrequency,
        billingPeriod,
        paymentAmount,
        trialPeriod,
        trialPeriodUnit,
        duration,
        billingCycles,
    } = formData;

    let descriptionText = '';
    if (billingCycles == '') {
        billingCycles = 0;
    }
    const initialDescription = `Your customer will be charged $${
        initialPrice || 0
    } immediately`;
    const payment = `$${
        paymentAmount || 0
    } every ${billingFrequency} ${billingPeriod}`;

    let trialDescription = '';
    if (trialPeriodUnit !== 'None') {
        trialDescription = `for their ${trialPeriod} ${trialPeriodUnit.toLowerCase()} trial, `;
    }

    if (duration === 'Never Ends') {
        descriptionText = `${initialDescription} ${trialDescription} and then ${payment} until they cancel.`;
    } else {
        const total = initialPrice
            ? (
                  parseFloat(initialPrice) +
                  parseFloat(paymentAmount) * billingCycles
              ).toFixed(2)
            : (parseFloat(paymentAmount) * billingCycles).toFixed(2);
        descriptionText = `${initialDescription} ${trialDescription} and then ${payment}, ${billingCycles} times. The total amount paid will be $${total}.`;
    }
    return descriptionText;
};

export enum FreequencyType {
    months = 'Monthly',
    days = 'Daily',
    weeks = 'Weekly',
}
