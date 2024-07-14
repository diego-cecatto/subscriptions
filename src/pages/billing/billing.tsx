import { useState } from 'react';
import {
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Typography,
    Grid,
    Container,
    Alert,
} from '@mui/material';
import { FreequencyType, generateDescription } from './billing.utils';
import MoneyFormatTextField from '../../components/MoneyField/MoneyField';

export declare type BillingData = {
    initialPrice: string;
    billingFrequency: string;
    billingPeriod: 'months' | 'days' | 'weeks';
    paymentAmount: string;
    trialPeriod: string;
    trialPeriodUnit: string;
    duration: string;
    billingCycles: number | '';
};

export const BillingPage = () => {
    const [formData, setFormData] = useState<BillingData>({
        initialPrice: '',
        billingFrequency: '',
        billingPeriod: 'days',
        paymentAmount: '',
        trialPeriod: '',
        trialPeriodUnit: 'None',
        duration: 'Never Ends',
        billingCycles: '',
    });

    const handleChange = (e: any, parsedValue: any = null) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: parsedValue ?? value,
        }));
    };

    const {
        initialPrice,
        billingFrequency,
        billingPeriod,
        paymentAmount,
        trialPeriod,
        trialPeriodUnit,
        duration,
        billingCycles,
    } = formData;

    return (
        <Container sx={{ p: 3 }} maxWidth="xl">
            <Typography variant="h6">Set up your subscription</Typography>
            <form>
                <Grid container gap={1}>
                    <Grid item xs={3}>
                        <FormControl fullWidth margin="normal">
                            <MoneyFormatTextField
                                label="Initial Price"
                                name="initialPrice"
                                value={initialPrice}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <div style={{ display: 'flex' }}>
                            <FormControl fullWidth margin="normal">
                                <TextField
                                    label="Billing Frequency"
                                    type="number"
                                    name="billingFrequency"
                                    value={billingFrequency}
                                    onChange={handleChange}
                                    style={{
                                        marginRight: '-1px',
                                    }}
                                    inputProps={{
                                        min: '1',
                                    }}
                                    required
                                />
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <Select
                                    name="billingPeriod"
                                    value={billingPeriod}
                                    onChange={(e) => handleChange(e)}
                                    required
                                >
                                    <MenuItem value="days">Days</MenuItem>
                                    <MenuItem value="weeks">Weeks</MenuItem>
                                    <MenuItem value="months">Months</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth margin="normal">
                            <MoneyFormatTextField
                                label={`${FreequencyType[billingPeriod]} Payment`}
                                name="paymentAmount"
                                value={paymentAmount}
                                onFocus={() => {
                                    if (!paymentAmount && initialPrice) {
                                        setFormData((prevData) => ({
                                            ...prevData,
                                            paymentAmount: initialPrice,
                                        }));
                                    }
                                }}
                                onChange={handleChange}
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <div style={{ display: 'flex' }}>
                            <FormControl fullWidth margin="normal">
                                <TextField
                                    label="Trial Period"
                                    type="number"
                                    name="trialPeriod"
                                    value={trialPeriod}
                                    onChange={handleChange}
                                    inputProps={{ min: '0' }}
                                    disabled={trialPeriodUnit === 'None'}
                                />
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <Select
                                    name="trialPeriodUnit"
                                    value={trialPeriodUnit}
                                    onChange={(e) => handleChange(e)}
                                >
                                    <MenuItem value="None">None</MenuItem>
                                    <MenuItem value="Days">Days</MenuItem>
                                    <MenuItem value="Weeks">Weeks</MenuItem>
                                    <MenuItem value="Months">Months</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Duration</InputLabel>
                            <Select
                                label="Duration"
                                name="duration"
                                value={duration}
                                onChange={(e) => handleChange(e)}
                            >
                                <MenuItem value="Never Ends">
                                    Never Ends
                                </MenuItem>
                                <MenuItem value="Customize">Customize</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    {duration === 'Customize' && (
                        <Grid item xs={3}>
                            <FormControl fullWidth margin="normal">
                                <TextField
                                    label="Billing Cycles"
                                    type="number"
                                    name="billingCycles"
                                    value={billingCycles}
                                    onChange={handleChange}
                                    inputProps={{ min: '1' }}
                                    required
                                />
                            </FormControl>
                        </Grid>
                    )}
                </Grid>
            </form>
            <Alert severity="info" variant="outlined">
                {generateDescription(formData)}
            </Alert>
        </Container>
    );
};
