import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {ListMenu} from "./ListMenu";

export const Header = () => {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <ListMenu/>
                </Toolbar>
            </AppBar>
        </Box>
    );
};