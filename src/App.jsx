import {Outlet, useNavigate, useLocation} from "react-router-dom"; // <-- Asegúrate que useLocation esté aquí
import {Navbar} from "./components/Navbar";
import {GlobalStyle, MainContentWrapper} from "./styles/Global.styled";
import React, {useContext, useEffect, useState} from "react";
import {SideBarComponent} from "./components/SideBar";
import AuthProvider, {AuthContext} from "./context/AuthContext";
import {createNewChat, getChatsByUser} from "./services/chatService";

function App() {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation(); // Hook para obtener la URL actual
    const [chats, setChats] = useState([]); // Estado para guardar la lista de chats

    // Determinar si estamos en la página home
    const isHomePage = location.pathname === '/';

    useEffect(() => {
        // Solo redirigir si el usuario está autenticado Y NO está en la home
        if (user?.id && !isHomePage) {
            (async () => {
                const fetchedChats = await getChatsByUser(user.id); // Renombramos a fetchedChats para evitar confusión
                setChats(fetchedChats);
                if (fetchedChats.length > 0) {
                    // Redirigir al chat más reciente
                    const latestChat = fetchedChats[0];
                    // Solo redirigir si no estamos ya en un chat
                    if (!location.pathname.includes('/Chat/')) {
                        navigate(`/Chat/${latestChat.id}`, { replace: true });
                    }
                } else {
                    // Crear un nuevo chat si no hay ninguno
                    const newChat = await createNewChat(user.id);
                    navigate(`/Chat/${newChat.id}`, { replace: true });
                }
            })();
        }
    }, [user?.id, navigate, location.pathname, isHomePage]);


    // 1. Extrae el ID del chat de la URL (ej: /Chat/123 -> 123)
    const pathSegments = location.pathname.split('/');
    const activeChatId = pathSegments[pathSegments.length - 1];

    // 2. Busca el chat activo en la lista de chats
    const activeChat = chats.find(chat => chat.id === activeChatId);

    // 3. Define el título que se pasará a la Navbar
    const activeChatTitle = activeChat
        ? activeChat.title || "Chat sin título"
        : "BÚHO Legal IA"; // Título predeterminado si no se encuentra el chat

    // ----------------------------------------------------

    // Si estamos en la home, solo mostrar el contenido sin sidebar ni navbar
    if (isHomePage) {
        return (
            <>
                <Outlet />
                <GlobalStyle/>
            </>
        );
    }

    // Para otras rutas (chat), mostrar el layout completo
    return (
        <div className="App" style={{display: "flex", height: "100vh"}}>
            <SideBarComponent />
            <MainContentWrapper>
                <Navbar
                    activeChatTitle={activeChatTitle}
                />
                <Outlet />
            </MainContentWrapper>
            <GlobalStyle/>
        </div>
    );
}

function AppWrapper() {
    return (
        <AuthProvider>
            <App/>
        </AuthProvider>
    );
}

export default AppWrapper;