import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';

function AccountForm({ account, onSubmit, onCancel }) {
    const initialFormState = { name: '', type: 'ASSET' };
    const [accountDetails, setAccountDetails] = useState(initialFormState);

    useEffect(() => {
        if (account) {
            setAccountDetails(account); // Populate the form with selected account
        } else {
            setAccountDetails({ name: '', type: 'ASSET' }); // Reset to defaults when no account is selected
        }
    }, [account]);

    const handleChange = (event, newValue) => {
        if (newValue) {
            // Handling changes from ToggleButtonGroup
            setAccountDetails(prev => ({ ...prev, type: newValue }));
        } else {
            // Handling changes from input fields
            const { name, value } = event.target;
            setAccountDetails(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(accountDetails); // Call the passed onSubmit function
        setAccountDetails(initialFormState);
    };

    const handleCancel = () => {
        onCancel();  // Clear the form and reset any selected account
    };

    const isFormValid = accountDetails.name.trim() !== '';

    return (
        <Container maxWidth="sm">
            <Typography variant="h6" gutterBottom>
                Manage Account
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={8}>
                        <TextField
                            fullWidth
                            label="Account Name"
                            name="name"
                            value={accountDetails.name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <ToggleButtonGroup
                            color="primary"
                            value={accountDetails.type}
                            exclusive
                            onChange={(e, newType) => handleChange(e, newType)}
                            fullWidth
                        >
                            <ToggleButton value="ASSET">Asset</ToggleButton>
                            <ToggleButton value="LIABILITY">Liability</ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                    <Grid item xs={6}>
                        <Button type="submit" variant="contained" color="primary" fullWidth disabled={!isFormValid}>
                            {account ? 'Update Account' : 'Create Account'}
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="outlined" color="secondary" onClick={handleCancel} fullWidth>
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default AccountForm;
