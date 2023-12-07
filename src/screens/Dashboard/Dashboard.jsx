import React, { useCallback, useEffect, useState } from "react";
import { get, map } from 'lodash';
import { API } from "aws-amplify";
import { Button, CircularProgress, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

import TopBar from "../../components/TopBar/TopBar";
import NewParcelDialog from "../../components/NewParcelDialog/NewParcelDialog";
import { BIKER, SENDER } from "../../App";

const Dashboard = ({ user, signOut }) => {
    const [loader, setLoader] = useState(false);
    const [parcels, setParcels] = useState([]);
    const [newDialogOpen, setNewDialogOpen] = useState(false);

    const userType = get(user, 'type', '');

    // Fetching the parcels for the user
    const fetchParcels = useCallback(async () => {
        setLoader(true);
        try {
          const params = {headers: {
            Authorization: `Bearer ${get(user, 'token', '')}`,
          }};
          const result = await API.get('api', `/parcel/${get(user, 'userId', '')}`, params);
          setParcels(result);
        } catch (error) {
          console.log(error);
        } finally {
          setLoader(false);
        }
      }, [setParcels, user]);
    
      useEffect(() => {
        fetchParcels();
      }, [fetchParcels]);

    // Mark the status of the parcel as picked up or delivered by the BIKERs
    // And then updating the table to reflect the change in state
    const changeState = useCallback(async (state, parcelId) => {
        setLoader(true);
        try {
            const params = {
                headers: {
                    Authorization: `Bearer ${get(user, 'token', '')}`,
                },
                body: {
                    status: state
                }
            };
            await API.put('api', `/parcel/${get(user, 'userId', '')}/state/${parcelId}`, params);
            const params2 = {headers: {
                Authorization: `Bearer ${get(user, 'token', '')}`,
            }};
            const result = await API.get('api', `/parcel/${get(user, 'userId', '')}`, params2);
            setParcels(result);
        } catch {
            alert('Error updating parcel status');
        } finally {
            setLoader(false);
        }
    }, [user]);

    return (
        <Grid>
            <TopBar signOut={signOut} />
            <Grid sx={{ padding: '30px' }}>
                <Typography sx={{ fontSize: '28px', fontWeight: 600, marginBottom: '20px' }}>Welcome {get(user, 'name', '')}!</Typography>
                {userType === SENDER && <Grid sx={{ display: 'flex' }}>
                    <Typography sx={{ fontSize: '22px', fontWeight: 600 }}>Your Parcels</Typography>
                    <Button variant="contained" sx={{
                        backgroundColor: '#e0a867 !important',
                        borderRadius: '70px',
                        fontWeight: 600,
                        marginLeft: '20px',
                        fontSize: '14px',
                    }}
                    onClick={() => setNewDialogOpen(true)}
                    >
                        New Parcel
                    </Button>
                </Grid>}
                {userType === BIKER && <Typography sx={{ fontSize: 18, fontWeight: 600 }}>Available Parcels</Typography>}
                {userType === BIKER && loader && <CircularProgress sx={{ color: '#e0a867' }} />}
                {userType === BIKER && !loader && <Table>
                    <TableHead>
                        <TableRow sx={{ borderBottom: '2px solid #000000' }}>
                            <TableCell sx={{ fontWeight: 600, fontSize: '18px' }}>Parcel ID</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '18px' }}>Origin</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '18px' }}>Destination</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '18px' }}>Pick Up</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {map(parcels, (parcel) => {
                            if (!parcel.bikerDelivering)
                            return (
                                <TableRow sx={{ cursor: 'pointer' }}>
                                    <TableCell>{parcel._id}</TableCell>
                                    <TableCell>{parcel.origin}</TableCell>
                                    <TableCell>{parcel.destination}</TableCell>
                                    <TableCell><Button onClick={() => changeState('PICKED_UP', parcel._id)}>Picked up</Button></TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>}
                <Typography sx={{ fontSize: 18, fontWeight: 600 }}>In Progress</Typography>
                {loader && <CircularProgress sx={{ color: '#e0a867' }} />}
                {!loader && <Table>
                    <TableHead>
                        <TableRow sx={{ borderBottom: '2px solid #000000' }}>
                            <TableCell sx={{ fontWeight: 600, fontSize: '18px' }}>Parcel ID</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '18px' }}>Origin</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '18px' }}>Destination</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '18px' }}>{userType === BIKER ? 'Delivery' : 'Status'}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {map(parcels, (parcel) => {
                            if ((userType === BIKER && parcel.bikerDelivering && !parcel.deliveredOn) || (userType === SENDER && !parcel.deliveredOn))
                            return (
                                <TableRow sx={{ cursor: 'pointer' }}>
                                    <TableCell>{parcel._id}</TableCell>
                                    <TableCell>{parcel.origin}</TableCell>
                                    <TableCell>{parcel.destination}</TableCell>
                                    {userType === SENDER && <TableCell>{parcel.pickedUpOn ? parcel.deliveredOn ? 'delivered' : 'en-route' : 'pending pickup'}</TableCell>}
                                    {userType === BIKER && <TableCell><Button onClick={() => changeState('DELIVERED', parcel._id)}>Delivered</Button></TableCell>}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>}
                <Typography sx={{ fontSize: 18, fontWeight: 600, marginTop: '20px' }}>Completed</Typography>
                {loader && <CircularProgress sx={{ color: '#e0a867' }} />}
                {!loader && <Table>
                    <TableHead>
                        <TableRow sx={{ borderBottom: '2px solid #000000' }}>
                            <TableCell sx={{ fontWeight: 600, fontSize: '18px' }}>Parcel ID</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '18px' }}>Origin</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '18px' }}>Destination</TableCell>
                            <TableCell sx={{ fontWeight: 600, fontSize: '18px' }}>Delivered On</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {map(parcels, (parcel) => {
                            if (parcel.deliveredOn)
                            return (
                                <TableRow sx={{ cursor: 'pointer' }}>
                                    <TableCell>{parcel._id}</TableCell>
                                    <TableCell>{parcel.origin}</TableCell>
                                    <TableCell>{parcel.destination}</TableCell>
                                    <TableCell>{parcel.deliveredOn}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>}
            </Grid>
            <NewParcelDialog dialogOpen={newDialogOpen} onDialogClose={() => setNewDialogOpen(false)} user={user} fetchParcels={fetchParcels} />
        </Grid>
    );
};

export default Dashboard;