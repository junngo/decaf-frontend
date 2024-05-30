import React from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function AccountList({ accounts, onSelectAccount, onDeleteAccount }) {
    // Filter accounts into two categories
    const assetAccounts = accounts.filter(account => account.type === 'ASSET');
    const liabilityAccounts = accounts.filter(account => account.type === 'LIABILITY');

    // Helper function to render a table for given accounts
    const renderAccountTable = (accounts, title) => (
        <>
            <Typography variant="h6" component="div" style={{ marginTop: 20 }}>
                {title}
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accounts.map((account) => (
                            <TableRow key={account.id}>
                                <TableCell>{account.name}</TableCell>
                                <TableCell>{account.type}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => onSelectAccount(account)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => onDeleteAccount(account.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );

    return (
        <Container maxWidth="sm">
            {renderAccountTable(assetAccounts, "Assets")}
            {renderAccountTable(liabilityAccounts, "Liabilities")}
        </Container>
    );
}

export default AccountList;
