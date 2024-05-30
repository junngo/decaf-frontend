import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';

function CategoryForm({ category, onSubmit, onCancel }) {
    const initialFormState = { name: '', type: 'EXPENSE' };  // Set the default type to EXPENSE
    const [categoryDetails, setCategoryDetails] = useState(initialFormState);

    useEffect(() => {
        if (category) {
            setCategoryDetails(category); // Populate the form with selected category
        } else {
            setCategoryDetails({ name: '', type: 'EXPENSE' }); // Reset to defaults when no category is selected
        }
    }, [category]);

    const handleChange = (event, newType) => {
        if (newType) {
            // Handling changes from ToggleButtonGroup for category type
            setCategoryDetails(prev => ({ ...prev, type: newType }));
        } else {
            // Handling changes from input fields for category name
            const { name, value } = event.target;
            setCategoryDetails(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(categoryDetails); // Call the passed onSubmit function
        setCategoryDetails(initialFormState); // Reset form after submission
    };

    const handleCancel = () => {
        onCancel(); // Clear the form and reset any selected category
    };

    const isFormValid = categoryDetails.name.trim() !== '';

    return (
        <Container maxWidth="sm">
            <Typography variant="h6" gutterBottom>
                Manage Category
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={8}>
                        <TextField
                            fullWidth
                            label="Category Name"
                            name="name"
                            value={categoryDetails.name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <ToggleButtonGroup
                            color="primary"
                            value={categoryDetails.type}
                            exclusive
                            onChange={(e, newType) => handleChange(e, newType)}
                            fullWidth
                        >
                            <ToggleButton value="EXPENSE">Expense</ToggleButton>
                            <ToggleButton value="REVENUE">Revenue</ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                    <Grid item xs={6}>
                        <Button type="submit" variant="contained" color="primary" fullWidth disabled={!isFormValid}>
                            {category ? 'Update Category' : 'Create Category'}
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

export default CategoryForm;
