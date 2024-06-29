import React from 'react'
import Image from 'next/image'
import { Button } from './ui/button';
import Link from 'next/link';

interface EmptyStateProps {
  title: string;
  search?: string;
  buttonLink: string;
  buttonText: string;
}

const EmptyState = ({ title, search,  buttonLink, buttonText }: EmptyStateProps) => {
  return (
    <section className='flex-center size-full flex-col'>
      <Image 
        src="/icons/emptyState.svg" 
        width={250}
        height={250}
        alt='empty state icon'
      />
      <div className='flex-center w-full max-w-[255px] flex-col gap-3'>
        <h1 className='text-[16px] font-medium text-white-1 text-center'>{title}</h1>
        {search && (
          <p>Try adjusting your search to find what you are looking for</p>
        )}
        {buttonLink && buttonText && (
          <Button className='bg-orange-1'>
            <Link href={buttonLink} className='gap-2 flex'>
              <Image 
                src="/icons/discover.svg"
                width={24}
                height={24}
                alt='discover icon'
              />
              <h1 className='text-[16px] font-bold text-white-1'>
                {buttonText}
              </h1>
            </Link>
          </Button>
        )}
      </div>
    </section>
  )
}

export default EmptyState