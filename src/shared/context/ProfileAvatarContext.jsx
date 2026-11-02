import { createContext, useContext } from "react";
import { useNaqlah } from "./NaqlahContext.jsx";

// Preserve context identity when Vite hot-reloads this module during development.
const Context =
  import.meta.hot?.data.profileAvatarContext ?? createContext(null);
if (import.meta.hot) import.meta.hot.data.profileAvatarContext = Context;
export function ProfileAvatarProvider({ children }) {
  const { state, patch } = useNaqlah();
  return (
    <Context.Provider
      value={{
        name: state.name,
        avatar: state.avatar,
        setName: (name) => patch({ name }),
        setAvatar: (avatar) => patch({ avatar }),
        removeAvatar: () => patch({ avatar: "" }),
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useProfileAvatar() {
  return useContext(Context);
}
