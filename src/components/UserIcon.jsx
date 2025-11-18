import React, {useContext} from "react";
import {UserIcon, UserIcon__image} from "../styles/Navbar.styled";
import {AuthContext} from "../context/AuthContext";

export const UserIconComponent = ({onClick}) => {
    const {user} = useContext(AuthContext);

    const getUserInitial = () => {
        if (user?.name) {
            return user.name.charAt(0).toUpperCase();
        }
        return "U";
    };

    return (
        <UserIcon onClick={onClick}>
            {user?.avatar ? (
                <UserIcon__image src={user.avatar} alt="Usuario"/>
            ) : (
                <span>{getUserInitial()}</span>
            )}
        </UserIcon>
    );
};
