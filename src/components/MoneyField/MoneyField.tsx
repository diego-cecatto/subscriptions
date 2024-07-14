import { InputAdornment, SelectChangeEvent, TextField } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const MoneyFormatTextField = ({ label, value, onChange, ...props }: any) => {
    const handleInputChange = (event: SelectChangeEvent<string>) => {
        const inputValue = event.target.value;
        const numericValue = inputValue.replace(/[^0-9.]/g, '');
        onChange(event, formatMoney(numericValue));
    };

    const formatMoney = (value: string) => {
        if (!value) {
            return '';
        }
        const cleanedValue = value.replace(/[^0-9]/g, '');
        let number = parseInt(cleanedValue, 10);
        if (number < 100) {
            return (number / 100).toFixed(2).toString();
        }
        const dollars = (number / 100).toFixed(2);
        return dollars.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    return (
        <TextField
            label={label}
            value={formatMoney(value)}
            onChange={handleInputChange}
            inputProps={{
                min: 0,
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <AttachMoneyIcon />
                    </InputAdornment>
                ),
            }}
            {...props}
        />
    );
};

export default MoneyFormatTextField;
