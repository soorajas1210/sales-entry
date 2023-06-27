import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, Typography, Paper, FormHelperText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addDetails, getItem } from '../Actions/Actions';

const SalesEntryForm = () => {
    const dispatch = useDispatch()
    const today = new Date();
    const [errors, setErrors] = useState({});
    useEffect(() => {
        dispatch(getItem())
    }, [])

    const data = useSelector((state) => state.item)
    const { item } = data

    console.log("item", item)

    const formattedDate = format(today, 'yyyy-MM-dd');

    const [header, setHeader] = useState({
        vr_no: 0,
        vr_date: new Date(`${formattedDate}T00:00:00.000Z`).toISOString(),
        ac_name: '',
        ac_amt: 0,
        status: 'A',
    });
    const [details, setDetails] = useState([
        {
            vr_no: header.vr_no,
            sr_no: 0,
            item_code: '',
            item_name: '',
            description: '',
            qty: 0,
            rate: 0.00,
        },
    ]);

    const [selectedItem, setSelectedItem] = useState({ item_code: '', item_name: '' });


    const handleHeaderChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = name === 'vr_no' ? parseInt(value) : value;
        setHeader((prevHeader) => ({
            ...prevHeader,
            [name]: parsedValue,
        }));
        setDetails((prevDetails) => {
            const updatedDetails = [...prevDetails];
            updatedDetails[0] = {
                ...updatedDetails[0],
                vr_no: parsedValue,
            };
            return updatedDetails;
        });
    };

    const handleDetailChange = (e, index) => {
        const { name, value } = e.target;
        if (name === 'item_code') {
            const selectedItem = item.find((item) => item.item_code === value);
            setDetails((prevDetails) => {
                const updatedDetails = [...prevDetails];
                updatedDetails[index] = {
                    ...updatedDetails[index],
                    [name]: value,
                    item_name: selectedItem ? selectedItem.item_name : '',
                    vr_no: index === 0 ? header.vr_no : updatedDetails[0].vr_no,
                    sr_no: index + 1,
                };
                return updatedDetails;
            });
            const accountAmount = calculateAccountAmount();
            setHeader((prevHeader) => ({
                ...prevHeader,
                ac_amt: accountAmount,
            }));
        } else {
            setDetails((prevDetails) => {
                const updatedDetails = [...prevDetails];
                updatedDetails[index] = {
                    ...updatedDetails[index],
                    [name]: value,
                    vr_no: index === 0 ? header.vr_no : updatedDetails[0].vr_no,
                    sr_no: index + 1,
                };
                return updatedDetails;
            });
            const accountAmount = calculateAccountAmount();
            setHeader((prevHeader) => ({
                ...prevHeader,
                ac_amt: accountAmount,
            }));
        }
    };

    useEffect(() => {
        const accountAmount = calculateAccountAmount();
        setHeader((prevHeader) => ({
            ...prevHeader,
            ac_amt: accountAmount,
        }));
    }, []);

    const calculateAccountAmount = () => {
        let totalAmount = 0;
        details.forEach((detail) => {
            const { qty, rate } = detail;
            const amount = qty * rate;
            totalAmount += amount;
        });
        return totalAmount;
    };

    const addDetailRow = () => {
        setDetails((prevDetails) => [
            ...prevDetails,
            {
                vr_no: header.vr_no,
                sr_no: 0,
                item_code: '',
                item_name: '',
                description: '',
                qty: 0,
                rate: 0.00,
            },
        ]);
    };

    const removeDetailRow = (index) => {
        setDetails((prevDetails) => {
            const updatedDetails = [...prevDetails];
            updatedDetails.splice(index, 1);
            return updatedDetails;
        });
    };


    const validateForm = () => {
        let formErrors = {};

        if (header.vr_no === 0) {
            formErrors.vr_no = "VR No is required.";
        }

        if (header.ac_name.trim() === "") {
            formErrors.ac_name = "Account Name is required.";
        } else if (!/^[A-Za-z]+$/.test(header.ac_name.trim())) {
            formErrors.ac_name = "Account Name must contain only letters.";
        }

        details.forEach((detail, index) => {
            if (detail.item_code === "") {
                formErrors[`item_code_${index}`] = "Item Code is required.";
            }

            if (detail.qty === 0) {
                formErrors[`qty_${index}`] = "Quantity should be greater than 0.";
            }

            if (detail.rate === 0) {
                formErrors[`rate_${index}`] = "Rate should be greater than 0.";
            }

            if (detail.description.trim() === "") {
                formErrors[`description_${index}`] = "Description is required.";
            }
        });

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            dispatch(addDetails(header, details));
        } else {
          
            console.log("Form validation failed.");
        }
    };

    return (
        <Paper sx={{
            backgroundColor: 'rgba(186, 177, 229, 0.1)',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 1)',
            mt: 5
        }}>
            <form onSubmit={handleSubmit} style={{ margin: 5 }} >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h2>HEADER</h2>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            label="VR No"
                            name="vr_no"
                            value={header.vr_no}
                            onChange={handleHeaderChange}
                            fullWidth
                            error={!!errors.vr_no}
                            helperText={errors.vr_no}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            type="date"
                            name="vr_date"
                            value={formattedDate}
                            onChange={handleHeaderChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            label="Account Name"
                            name="ac_name"
                            value={header.ac_name}
                            onChange={handleHeaderChange}
                            fullWidth
                            error={!!errors.ac_name}
                            helperText={errors.ac_name}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            label="Account Amount"
                            type="number"
                            name="ac_amt"
                            value={header.ac_amt}
                            onChange={handleHeaderChange}
                            fullWidth
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Status</InputLabel>
                            <Select
                                name="status"
                                value={header.status}
                                onChange={handleHeaderChange}
                            >
                                <MenuItem value="A">Active</MenuItem>
                                <MenuItem value="B">Inactive</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <h2>DETAIL</h2>
                    </Grid>
                    {details.map((detail, index) => (
                        <React.Fragment key={index}>
                            <Grid item xs={12} >
                                <Typography variant="subtitle1">{`Row ${index + 1}`}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <FormControl fullWidth>
                                    <InputLabel>Item Code</InputLabel>
                                    <Select
                                        required
                                        name="item_code"
                                        value={detail.item_code}
                                        onChange={(e) => handleDetailChange(e, index)}
                                        error={!!errors[`item_code_${index}`]}
                                    >
                                        {item.map((item) => (
                                            <MenuItem key={item.item_code} value={item.item_code}>
                                                {item.item_code}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors[`item_code_${index}`] && (
                                        <FormHelperText error>{errors[`item_code_${index}`]}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <TextField

                                    label="Item Name"
                                    name="item_name"
                                    value={detail.item_name}
                                    onChange={(e) => handleDetailChange(e, index)}
                                    fullWidth
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={2}>
                                <TextField
                                    required
                                    label="Quantity"
                                    type="number"
                                    name="qty"
                                    value={detail.qty}
                                    onChange={(e) => handleDetailChange(e, index)}
                                    fullWidth
                                    error={!!errors[`qty${index}`]}
                                    helperText={errors[`qty_${index}`]}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={2}>
                                <TextField
                                    required
                                    label="Rate"
                                    type="number"
                                    name="rate"
                                    value={detail.rate}
                                    onChange={(e) => handleDetailChange(e, index)}
                                    fullWidth
                                    error={!!errors[`rate${index}`]}
                                    helperText={errors[`rate_${index}`]}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    label="Description"
                                    name="description"
                                    value={detail.description}
                                    onChange={(e) => handleDetailChange(e, index)}
                                    fullWidth
                                    multiline
                                    minRows={4}
                                    error={!!errors[`description${index}`]}
                                    helperText={errors[`description_${index}`]}
                                    
                                />
                            </Grid>
                            {index > 0 && (
                                <Grid item xs={12} sx={{ ml: 3 }}>
                                    <Button variant="outlined" color="secondary" onClick={() => removeDetailRow(index)}>
                                        Remove Row
                                    </Button>
                                </Grid>
                            )}
                        </React.Fragment>
                    ))}



                    <Grid item xs={12} sx={{ m: 3 }} >
                        <Grid container spacing={2} justifyContent="flex-start">
                            <Grid item>
                                <Button variant="outlined" onClick={addDetailRow} color="secondary">
                                    Add Row
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button type="submit" variant="outlined" color="secondary">
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </form>
        </Paper>
    );
};

export default SalesEntryForm;
