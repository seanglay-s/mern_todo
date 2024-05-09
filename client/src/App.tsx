import { ThemeProvider } from "@emotion/react"
import { ThemeSettings } from "./theme/Theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./routes";
import { useRoutes } from "react-router-dom";


function App() {
  const theme = ThemeSettings();
  const queryClient = new QueryClient()
  const router = useRoutes(Router)
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        {router}
      </ThemeProvider>
    </QueryClientProvider>



  )
}

export default App
