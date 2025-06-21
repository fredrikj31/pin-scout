import { FirebaseProvider } from "./providers/firebase/Provider";

export const App = () => {
  return (
    <FirebaseProvider>
      <h1>Hello World</h1>
    </FirebaseProvider>
  );
};

export default App;
