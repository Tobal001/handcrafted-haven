import { auth } from '@/auth';
import { createProfile, updateProfile } from '@/lib/data/profile';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const formData = await req.formData();
  await createProfile(session.user.id, formData);
  return NextResponse.json({ success: true });
}

export async function PUT(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const formData = await req.formData();
  await updateProfile(session.user.id, formData);
  return NextResponse.json({ success: true });
}
