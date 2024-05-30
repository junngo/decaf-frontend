import React from 'react';
import { Grid, Typography } from '@mui/material';
import AccountManagement from '../components/settings/AccountManagement';
import CategoryManagement from '../components/settings/CategoryManagement';

function SettingsPage() {
    return (
        <div style={{ margin: '20px' }}>
            <Typography variant="h4" gutterBottom style={{ marginBottom: '4rem'}}>
                Settings
            </Typography>
            <Grid container>
                <Grid item xs={12} md={6}>
                    <CategoryManagement />
                </Grid>
                <Grid item xs={12} md={6}>
                    <AccountManagement />
                </Grid>
            </Grid>
        </div>
    );
}

export default SettingsPage;
