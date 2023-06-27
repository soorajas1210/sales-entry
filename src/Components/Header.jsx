import React, { useEffect } from 'react'
import {  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useDispatch, useSelector } from "react-redux"
import { getHeader } from '../Actions/Actions'


function Header() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getHeader())

    }, [])

    const data = useSelector((state) => state.header)
    const { header } = data

    return (
        <Paper>
            <Typography variant="h6" sx={{ backgroundColor: '#BAB1E5', color: 'black', padding: '1rem', textAlign: 'center' }}>
                HEADER
            </Typography>
            <TableContainer>
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell>VR No</TableCell>
                            <TableCell>VR Date</TableCell>
                            <TableCell>Account Name</TableCell>
                            <TableCell>Account Amount</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {header.map((headerItem) => (
                            <TableRow key={headerItem.vr_no}>
                                <TableCell>{headerItem.vr_no}</TableCell>
                                <TableCell>{headerItem.vr_date}</TableCell>
                                <TableCell>{headerItem.ac_name}</TableCell>
                                <TableCell>{headerItem.ac_amt}</TableCell>
                                <TableCell>{headerItem.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default Header
