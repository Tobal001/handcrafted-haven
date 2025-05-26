

// // src/types/next-auth.d.ts

// import 'next-auth';
// import { UserRole } from '../lib/definitions';

// declare module 'next-auth' {
//   interface User {
//     id: string;
//     role: UserRole;
//   }

//   interface Session {
//     user: {
//       id: string;
//       role: UserRole;
//       name?: string;
//       email?: string;
//       image?: string;
//     };
//   }
// }

// declare module 'next-auth/jwt' {
//   interface JWT {
//     id: string;
//     role: UserRole;
//   }
// }








// src/types/next-auth.d.ts
import 'next-auth';
import { UserRole } from '../lib/definitions';

declare module 'next-auth' {
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    role: UserRole;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      role: UserRole;
      image?: string | null;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    name?: string | null;
    email?: string | null;
    role: UserRole;
  }
}

