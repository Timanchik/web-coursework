import { useUserStore } from "./hooks/useUserStore";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import routes from "./routes";
import { RequireAuth } from "./components/router/LinkComposition";
import { Route, Routes } from "react-router-dom";
import { observer } from "mobx-react-lite";

const App = observer(() => {
    const { user, isAuthenticated } = useUserStore();
    console.log(user)
    return <ThemeProvider theme={theme}>
        <Routes>
            {routes.map(({ path, name, exact, Component, needAuth, ...rest }, key) => {
                if (needAuth) {
                    return <Route {...{ key, exact, path, name }} element={<RequireAuth isAuthenticated={isAuthenticated}>
                        <Component {...rest} />
                    </RequireAuth>} />
                }
                return <Route {...{ key, exact, path, name }} element={<Component {...rest} />} />
            })}
        </Routes>
    </ThemeProvider>
})

export default App;
