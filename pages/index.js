import Head from 'next/head'
import Image from 'next/image'
import SearchInput from '@/components/SearchInput'
import GenderSelect from '@/components/GenderSelect';
import { useEffect, useState } from 'react';

export default function Home() {
  const [queryText, setqueryText] = useState(null);
  const [genderFilter, setGenderFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [isAsc, setisAsc] = useState(true);
  const [userList, setUserList] = useState([]);
  const baseApi = 'https://randomuser.me/api'
  const seedKey = 'albertseed'
  const limit = 10;
  
  const genderOptions = ['all', 'female', 'male'];
  
  const onSearchInput = (str, gender) => {
    console.log('onSearch', str, gender)
  }
  
  return (
    <div className="p-10">
      <Head>
        <title>User Management (Next.js)</title>
        <meta name="description" content="User Management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-2xl font-semibold">
          <a href="https://nextjs.org">Next.js</a> user management
        </h1>
        
        <div className="mb-4 mt-10 grid grid-cols-6 gap-4">
          <div className="col-span-2">
            <SearchInput onSearch={(str) => onSearchInput(str)} /> 
          </div>
          <div className="col-span-2">
            <GenderSelect options={genderOptions} onChangeValue={(str) => onSearchInput(str)} /> 
          </div>
        </div>
      </main>

      <footer className='mt-10'>
          Powered by{' '}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
      </footer>
    </div>
  )
}
