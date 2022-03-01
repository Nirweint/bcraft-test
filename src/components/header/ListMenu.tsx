import React, {MouseEvent, useState} from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import {PATH} from "../constants";
import {ListMenuItem} from "./ListMenuItem";

export const ListMenu = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const options = [
        {pageName: 'Login', pageLink: PATH.LOGIN},
        {pageName: 'Registration', pageLink: PATH.REGISTRATION},
        {pageName: 'Change password', pageLink: PATH.CHANGE_PASSWORD},
    ]

    return (
        <div>
            <Button
                style={{color: '#fff'}}
                onClick={handleClick}
            >
                Menu
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {options.map(({pageName, pageLink}, index) => {
                    return <ListMenuItem
                        key={index}
                        pageName={pageName}
                        pageLink={pageLink}
                        handleClose={handleClose}
                    />
                })}
            </Menu>
        </div>
    );
}