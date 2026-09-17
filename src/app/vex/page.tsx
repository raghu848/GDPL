import React from 'react';
import NavbarVex from '@/components/shared/NavbarVex';
import HeroVex from '@/components/sections/HeroVex';

export default function VexPage() {
  return (
    <main className="min-h-screen bg-black">
      <NavbarVex />
      <HeroVex />
    </main>
  );
}
