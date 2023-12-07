import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { API } from 'aws-amplify';
import { get } from 'lodash';
import React, { useCallback, useState } from 'react';

const styles = {
    title: {
        textAlign: 'center',
        fontWeight: 600,
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        marginTop: '20px',
    },
    button: {
        color: '#e0a867',
        fontWeight: 600,
    },
};

const NewParcelDialog = ({ dialogOpen, onDialogClose, user, fetchParcels }) => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [loader, setLoader] = useState(false);

    // Creating a new parcel and then forcing a refresh on the tables in the dashboard view
    const createNewParcel = useCallback(async () => {
        setLoader(true);
        const params = {
            headers: {
              Authorization: `Bearer ${get(user, 'token', '')}`,
            },
            body: {
              origin,
              destination,
            },
        };
        try {
            await API.post('api', `/parcel/${get(user, 'userId', '')}`, params);
            onDialogClose();
            fetchParcels();
            setOrigin('');
            setDestination('');
        } finally {
            setLoader(false);
        }
    }, [destination, origin, user, fetchParcels, onDialogClose]);

    return (
        <Dialog onClose={onDialogClose} open={dialogOpen}>
            <DialogTitle sx={styles.title}>Create a new parcel</DialogTitle>
            <DialogContent sx={styles.content}>
                <DialogContentText>Please specify the pickup and delivery addresses</DialogContentText>
                <TextField value={origin} onChange={(e) => setOrigin(e.target.value)} sx={styles.input} id="origin" label="Origin" variant="outlined" />
                <TextField value={destination} onChange={(e) => setDestination(e.target.value)} sx={styles.input} id="destination" label="Destination" variant="outlined" />
            </DialogContent>
            <DialogActions>
                <Button disabled={loader} onClick={onDialogClose} sx={styles.button}>Cancel</Button>
                {loader ? <CircularProgress sx={{ color: '#e0a867' }} /> : <Button disabled={!origin || !destination} onClick={createNewParcel} sx={styles.button}>Create</Button>}
            </DialogActions>
        </Dialog>
    );
};

export default NewParcelDialog;