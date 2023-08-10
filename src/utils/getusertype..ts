import { User } from "firebase/auth";

export const getUserType = (currentUser: User | null) => {
    if(currentUser) {
        switch(currentUser.email) {
            case 'user-c@gmail.com':
                return 'Admin';
            default:
                return "User"
        }
    }
  }