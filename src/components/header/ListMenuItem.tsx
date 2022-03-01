import React from 'react';
import {NavLink} from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";

type ListMenuItemPropsType = {
    pageName: string
    pageLink: string
    handleClose: () => void
}

export const ListMenuItem = ({pageName, pageLink, handleClose}: ListMenuItemPropsType) => {

    const linkStyle = {textDecoration: 'none', color: '#000'}

    return (
        <NavLink style={linkStyle} to={pageLink}>
            <MenuItem onClick={handleClose}>
                {pageName}
            </MenuItem>
        </NavLink>
    );
};