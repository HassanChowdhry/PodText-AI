"use client";

import React from 'react';  
import Link from 'next/link';
import Image from 'next/image';
import { SignedIn } from '@clerk/nextjs';

const RightNavbar = () => {
  return (
    <section className='right_sidebar text-white-1'>
      <SignedIn />
    </section>
  );
};

export default RightNavbar;