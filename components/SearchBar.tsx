import { useEffect, useState } from 'react';
import { Input } from './ui/input';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useDebounce } from '@/lib/useDebounce';

export default function SearchBar(){
  const [search, setSearch] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const debouncedSearch = useDebounce(search, 1000);

  useEffect(() => {
    if (debouncedSearch) {
      router.push(`/discover?search=${debouncedSearch}`)
    } else if (!debouncedSearch && pathname === '/discover') {
      router.push('/discover')
    }
  }, [debouncedSearch, router, pathname])
  return (
    <div className="relative mt-8 block">
      <Input 
        className='input-class py-6 pl-12 focus-visible:ring-offset-sakura-1'
        placeholder='Search for podcasts'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onLoad={() => setSearch('')}
      />
      <Image 
        src="/icons/search.svg" 
        alt="search" 
        className="absolute left-4 top-4" 
        width={20}
        height={20}  
      />
    </div>
  )
}

