import { EventButton } from "./components/EventButton";
import { FirebaseProvider } from "./providers/firebase/Provider";

export const App = () => {
  return (
    <FirebaseProvider>
      <h1 className="text-xl">Hello World</h1>
      <EventButton />
    </FirebaseProvider>
  );
};

export default App;
