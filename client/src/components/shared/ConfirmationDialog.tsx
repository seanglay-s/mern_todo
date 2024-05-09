import Button from '@mui/material/Button';
import React, { useState } from 'react';
import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    ListItemIcon,
    ListItemText, MenuItem, Typography,
} from '@mui/material';

interface ConfirmationDialogProps {
    menu: {
        icon: React.ReactNode;
        title: string;
    };
    button: {
        agreeTitle: string,
        disagreeTitle: string
    };
    handleAgree: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ menu, button, handleAgree }) => {
    const [open, setOpen] = useState<boolean>(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleDisagree = () => {
        console.log('I do not agree.');
        handleClose();
    };

    return (
        <div>
            {/* Button to trigger the opening of the dialog */}
            <MenuItem onClick={handleClickOpen}>
                <ListItemIcon>
                    {menu.icon}
                </ListItemIcon>
                <ListItemText>{menu.title}</ListItemText>
            </MenuItem>
            {/* Dialog that is displayed if the state open is true */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    '& .MuiDialog-paper': {
                        width: '80vw',
                        maxWidth: '488px',
                        minHeight: '200px',
                    },
                }}
            >
                <DialogContent sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Box width="200px" height="200px" bgcolor="red" borderRadius="50%"
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {menu.icon}
                    </Box>
                    <Box height="14px" />
                    <Typography variant="body1">Are you sure you want to delete this role?</Typography>
                    <Box height="14px" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDisagree} color="primary">
                        {button.disagreeTitle}
                    </Button>
                    <Button onClick={() => {
                        handleAgree();
                        handleClose();
                    }} color="primary" autoFocus>
                        {button.agreeTitle}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ConfirmationDialog;