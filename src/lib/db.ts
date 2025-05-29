
// // src/lib/db.ts

// import postgres from 'postgres';
// import { User, UserInput } from './definitions';

// const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// export async function createUser(userInput: UserInput): Promise<User> {
//   const now = new Date();
//   const result = await sql<User[]>`
//     INSERT INTO users (
//       name, 
//       email, 
//       password, 
//       role,
//       email_verified,
//       verification_token,
//       reset_token,
//       reset_token_expires,
//       created_at,
//       updated_at
//     ) VALUES (
//       ${userInput.name}, 
//       ${userInput.email}, 
//       ${userInput.password}, 
//       ${userInput.role},
//       ${userInput.email_verified ?? false},
//       ${userInput.verification_token ?? null},
//       ${userInput.reset_token ?? null},
//       ${userInput.reset_token_expires ?? null},
//       ${userInput.created_at ?? now},
//       ${userInput.updated_at ?? now}
//     ) RETURNING *
//   `;
//   return result[0];
// }

// export async function getUserByEmail(email: string): Promise<User | null> {
//   try {
//     const result = await sql<User[]>`
//       SELECT * FROM users WHERE email = ${email} LIMIT 1
//     `;
//     return result[0] || null;
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     return null;
//   }
// }








// // src/lib/db.ts
// import postgres from 'postgres';
// import { User, UserInput } from './definitions';

// // Type guard for connection errors
// function isConnectionError(error: unknown): error is NodeJS.ErrnoException {
//   return error instanceof Error && (
//     (error as NodeJS.ErrnoException).code === 'EAI_AGAIN' || 
//     (error as NodeJS.ErrnoException).code === 'ECONNREFUSED'
//   );
// }

// // Connection configuration
// const createConnection = () => {
//   return postgres(process.env.POSTGRES_URL!, {
//     ssl: 'require',
//     connection: {
//       timeout: 5000,
//     },
//     idle_timeout: 20,
//     max_lifetime: 60 * 30,
//     onnotice: () => {},
//     transform: {
//       undefined: null,
//     },
//   });
// };

// let sql = createConnection();

// // Function to handle connection retries with proper error typing
// const withRetry = async <T>(
//   fn: () => Promise<T>, 
//   retries = 3, 
//   delay = 1000
// ): Promise<T> => {
//   try {
//     return await fn();
//   } catch (error: unknown) {
//     if (retries <= 0) {
//       console.error('Max retries reached');
//       throw new Error('Database connection failed after multiple attempts');
//     }

//     if (isConnectionError(error)) {
//       console.log(`Connection failed (${error.code}). Retrying in ${delay}ms... (${retries} retries left)`);
//       await new Promise(resolve => setTimeout(resolve, delay));
      
//       // Recreate the connection
//       try {
//         await sql.end();
//       } catch (e) {
//         console.warn('Error closing old connection:', e);
//       }
//       sql = createConnection();
      
//       return withRetry(fn, retries - 1, delay * 2);
//     }

//     if (error instanceof Error) {
//       throw error;
//     }
//     throw new Error('Unknown database error occurred');
//   }
// };

// export async function createUser(userInput: UserInput): Promise<User> {
//   return withRetry(async () => {
//     const now = new Date();
//     const result = await sql<User[]>`
//       INSERT INTO users (
//         name, 
//         email, 
//         password, 
//         role,
//         email_verified,
//         verification_token,
//         reset_token,
//         reset_token_expires,
//         created_at,
//         updated_at
//       ) VALUES (
//         ${userInput.name}, 
//         ${userInput.email}, 
//         ${userInput.password}, 
//         ${userInput.role},
//         ${userInput.email_verified ?? false},
//         ${userInput.verification_token ?? null},
//         ${userInput.reset_token ?? null},
//         ${userInput.reset_token_expires ?? null},
//         ${userInput.created_at ?? now},
//         ${userInput.updated_at ?? now}
//       ) RETURNING *
//     `;
//     return result[0];
//   });
// }

// export async function getUserByEmail(email: string): Promise<User | null> {
//   return withRetry(async () => {
//     const result = await sql<User[]>`
//       SELECT * FROM users WHERE email = ${email} LIMIT 1
//     `;
//     return result[0] || null;
//   });
// }

// // Cleanup connection when process exits
// process.on('exit', async () => {
//   try {
//     await sql.end();
//   } catch (e) {
//     console.warn('Error closing connection:', e);
//   }
// });








// src/lib/db.ts
import postgres from 'postgres';
import { User, UserInput } from './definitions'; // Assuming UserInput might contain email_verified as boolean

// Type guard for connection errors
function isConnectionError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && (
    (error as NodeJS.ErrnoException).code === 'EAI_AGAIN' ||
    (error as NodeJS.ErrnoException).code === 'ECONNREFUSED'
  );
}

// Connection configuration
const createConnection = () => {
  return postgres(process.env.POSTGRES_URL!, {
    ssl: 'require',
    connection: {
      timeout: 5000,
    },
    idle_timeout: 20,
    max_lifetime: 60 * 30,
    onnotice: () => {},
    transform: {
      undefined: null,
    },
  });
};

let sql = createConnection();

// Function to handle connection retries with proper error typing
const withRetry = async <T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 1000
): Promise<T> => {
  try {
    return await fn();
  } catch (error: unknown) {
    if (retries <= 0) {
      console.error('Max retries reached');
      throw new Error('Database connection failed after multiple attempts');
    }

    if (isConnectionError(error)) {
      console.log(`Connection failed (${error.code}). Retrying in ${delay}ms... (${retries} retries left)`);
      await new Promise(resolve => setTimeout(resolve, delay));

      // Recreate the connection
      try {
        await sql.end();
      } catch (e) {
        console.warn('Error closing old connection:', e);
      }
      sql = createConnection();

      return withRetry(fn, retries - 1, delay * 2);
    }

    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown database error occurred');
  }
};

export async function createUser(userInput: UserInput): Promise<User> {
  return withRetry(async () => {
    const now = new Date();

    // Determine the value for email_verified
    // If userInput.email_verified is true, set it to the current timestamp (now).
    // Otherwise, it should be null (meaning not verified).
    const emailVerifiedTimestamp = userInput.email_verified ? now : null;

    const result = await sql<User[]>`
      INSERT INTO users (
        name,
        email,
        password,
        role,
        email_verified,
        verification_token,
        reset_token,
        reset_token_expires,
        created_at,
        updated_at
      ) VALUES (
        ${userInput.name},
        ${userInput.email},
        ${userInput.password},
        ${userInput.role},
        ${emailVerifiedTimestamp}, -- THIS IS THE MODIFIED LINE
        ${userInput.verification_token ?? null},
        ${userInput.reset_token ?? null},
        ${userInput.reset_token_expires ?? null},
        ${userInput.created_at ?? now},
        ${userInput.updated_at ?? now}
      ) RETURNING *
    `;
    return result[0];
  });
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return withRetry(async () => {
    const result = await sql<User[]>`
      SELECT * FROM users WHERE email = ${email} LIMIT 1
    `;
    return result[0] || null;
  });
}

// Cleanup connection when process exits
process.on('exit', async () => {
  try {
    await sql.end();
  } catch (e) {
    console.warn('Error closing connection:', e);
  }
});