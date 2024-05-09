import { ThemeProvider } from "@emotion/react"
import { ThemeSettings } from "./theme/Theme";
import Todo from "./routes/todo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


function App() {
  const theme = ThemeSettings();
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Todo />
      </ThemeProvider>
    </QueryClientProvider>



  )
}

export default App
