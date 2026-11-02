import Providers from "./providers.jsx";
import AppRouter from "./router.jsx";
import { NaqlahProvider } from "../shared/context/NaqlahContext.jsx";
import { ProfileAvatarProvider } from "../shared/context/ProfileAvatarContext.jsx";

export default function App() {
  return (
    <Providers>
      <NaqlahProvider>
        <ProfileAvatarProvider>
          <AppRouter />
        </ProfileAvatarProvider>
      </NaqlahProvider>
    </Providers>
  );
}
