import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDetail } from '../Actions/Actions'

function Detail() {

    const dispatch = useDispatch()


    const data = useSelector((state) => state.detail)
    const { detail } = data

    useEffect(() => {
        dispatch(getDetail())

    }, [])


    return (
        <Paper>
            <Typography variant="h6" sx={{ backgroundColor: '#BAB1E5', color: 'black', padding: '1rem', textAlign: 'center' }}>
                DETAILS
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>VR No</TableCell>
                            <TableCell>SR No</TableCell>
                            <TableCell>Item Code</TableCell>
                            <TableCell>Item Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Rate</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {detail.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.vr_no}</TableCell>
                                <TableCell>{row.sr_no}</TableCell>
                                <TableCell>{row.item_code}</TableCell>
                                <TableCell>{row.item_name}</TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>{row.qty}</TableCell>
                                <TableCell>{row.rate}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default Detail
