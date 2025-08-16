import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Compilet from "./pages/Compiler";
const App = () => {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Compilet />
      </QueryClientProvider>
    </>
  );
};

export default App;
