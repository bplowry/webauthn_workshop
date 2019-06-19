import React from "react";

export interface User {
    id?: string;
    displayName?: string;
}

export type UserContextType = {
    user: User | false | null;
    setUser(user: UserContextType["user"]): void;
};
export const UserContext = React.createContext<UserContextType>({
    user: false,
    setUser: () => {}
});
