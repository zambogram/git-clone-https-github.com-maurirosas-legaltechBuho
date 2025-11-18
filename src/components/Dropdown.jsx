import React, {forwardRef, useContext} from "react";
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

    return (
        <DropdownWrapper ref={ref}>
            {user ? (
                <>
                    <DropdownHeader>
                        <DropdownUserName>{user.name || "Usuario"}</DropdownUserName>
                        <DropdownUserEmail>{user.email || ""}</DropdownUserEmail>
                    </DropdownHeader>

                    <DropdownMenu>
                        <DropdownItem>
                            <FontAwesomeIcon icon={faUser}/>
                            <span>Mi perfil</span>
                        </DropdownItem>

                        <DropdownItem>
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
