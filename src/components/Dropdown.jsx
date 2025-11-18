import React, {forwardRef, useContext} from "react";
import { useNavigate } from "react-router-dom";
import {
    DropdownWrapper,
    DropdownHeader,
    DropdownUserName,
    DropdownUserEmail,
    DropdownMenu,
    DropdownItem,
    DropdownDivider
} from "../styles/Navbar.styled";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear, faRightFromBracket, faUser} from "@fortawesome/free-solid-svg-icons";
import {AuthContext} from "../context/AuthContext";

export const DropdownComponent = forwardRef((props, ref) => {
    const {loginWithGoogle, logout, user} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate("/profile");
    };

    const handleSettingsClick = () => {
        navigate("/settings");
    };

    return (
        <DropdownWrapper ref={ref}>
            {user ? (
                <>
                    <DropdownHeader>
                        <DropdownUserName>{user.name || "Usuario"}</DropdownUserName>
                        <DropdownUserEmail>{user.email || ""}</DropdownUserEmail>
                    </DropdownHeader>

                    <DropdownMenu>
                        <DropdownItem onClick={handleProfileClick}>
                            <FontAwesomeIcon icon={faUser}/>
                            <span>Mi perfil</span>
                        </DropdownItem>

                        <DropdownItem onClick={handleSettingsClick}>
                            <FontAwesomeIcon icon={faGear}/>
                            <span>Ajustes</span>
                        </DropdownItem>

                        <DropdownDivider />

                        <DropdownItem onClick={logout}>
                            <FontAwesomeIcon icon={faRightFromBracket}/>
                            <span>Cerrar sesión</span>
                        </DropdownItem>
                    </DropdownMenu>
                </>
            ) : (
                <DropdownMenu>
                    <DropdownItem
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            loginWithGoogle();
                        }}
                    >
                        <FontAwesomeIcon icon={faUser}/>
                        <span>Iniciar sesión</span>
                    </DropdownItem>
                </DropdownMenu>
            )}
        </DropdownWrapper>
    );
});
