import React, {useContext, useEffect, useRef, useState} from "react";
import {UserIconComponent} from "./UserIcon";
import {DropdownComponent} from "./Dropdown";
import {AuthContext} from "../context/AuthContext";

import {NavbarWrapper, Span__tituloChat, UserIconContainer} from "../styles/Navbar.styled";

export const Navbar = ({activeChatTitle}) => {
    const {user} = useContext(AuthContext);
    const [openProfile, setOpenProfile] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenProfile(false);
            }
        };

        if (openProfile) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openProfile]);

    return (
        <NavbarWrapper>
            <Span__tituloChat>
                {activeChatTitle || "BÚHO Legal IA"}
            </Span__tituloChat>

            <UserIconContainer>
                <UserIconComponent onClick={() => setOpenProfile((prev) => !prev)}/>

                {openProfile && (
                    <DropdownComponent ref={dropdownRef}/>
                )}
            </UserIconContainer>
        </NavbarWrapper>
    );
};
