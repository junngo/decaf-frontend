import React from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function CategoryList({ categories, onSelectCategory, onDeleteCategory }) {
    // Filter categories by type
    const expenseCategories = categories.filter(category => category.type === 'EXPENSE');
    const revenueCategories = categories.filter(category => category.type === 'REVENUE');

    // Helper function to render a table for given categories
    const renderCategoryTable = (categories, title) => (
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
                        {categories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell>{category.name}</TableCell>
                                <TableCell>{category.type}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => onSelectCategory(category)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => onDeleteCategory(category.id)}>
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
            {renderCategoryTable(expenseCategories, "Expenses")}
            {renderCategoryTable(revenueCategories, "Revenues")}
        </Container>
    );
}

export default CategoryList;
