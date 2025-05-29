
// src/app/api/seed/route.ts
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    // Clear all tables in proper order to respect foreign keys
    await sql`TRUNCATE TABLE 
      accounts, 
      sessions, 
      password_reset_tokens, 
      password_history, 
      artisan_profiles, 
      users 
      RESTART IDENTITY CASCADE`;

    // Create test users
    const testUsers = [
      {
        name: 'Admin User',
        email: 'admin@handcrafted.com',
        role: 'admin',
        password: 'admin123',
        artisanProfile: null
      },
      {
        name: 'Artisan Jane',
        email: 'artisan@handcrafted.com',
        role: 'artisan',
        password: 'artisan123',
        artisanProfile: {
          bio: 'Woodworking specialist creating custom furniture',
          avatar_url: '/avatars/artisan-jane.jpg',
          location: 'Portland, OR',
          website: 'https://janes-woodworks.com',
          social_media: { 
            instagram: '@janes_woodworks',
            facebook: 'janeswoodworks'
          }
        }
      },
      {
        name: 'Regular Buyer',
        email: 'buyer@handcrafted.com',
        role: 'buyer',
        password: 'buyer123',
        artisanProfile: null
      }
    ];

    for (const user of testUsers) {
      // Insert user
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const newUser = await sql`
        INSERT INTO users (
          name, email, password, role, email_verified
        ) VALUES (
          ${user.name}, 
          ${user.email}, 
          ${hashedPassword}, 
          ${user.role}, 
          true
        ) RETURNING id
      `;

      // Insert password history
      await sql`
        INSERT INTO password_history (
          user_id, password_hash
        ) VALUES (
          ${newUser.rows[0].id}, 
          ${hashedPassword}
        )
      `;

      // Insert artisan profile if applicable
    //   if (user.artisanProfile && user.role === 'artisan') {
    //     await sql`
    //       INSERT INTO artisan_profiles (
    //         user_id, bio, avatar_url, location, website, social_media
    //       ) VALUES (
    //         ${newUser.rows[0].id},
    //         ${user.artisanProfile.bio},
    //         ${user.artisanProfile.avatar_url},
    //         ${user.artisanProfile.location},
    //         ${user.artisanProfile.website},
    //         ${user.artisanProfile.social_media}
    //       )
    //     `;
    //   }
    }

    return NextResponse.json({
      success: true,
      message: 'Database reset with complete schema and sample data',
      test_accounts: testUsers.map(user => ({
        email: user.email,
        password: user.password,
        role: user.role
      }))
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Database seeding failed',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}