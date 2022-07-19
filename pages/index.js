import Head from 'next/head'
import SearchInput from '@/components/SearchInput'
import GenderSelect from '@/components/GenderSelect';
import { useEffect, useState } from 'react';

export default function Home() {
  const [queryText, setqueryText] = useState(null);
  const [genderFilter, setGenderFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [isAsc, setisAsc] = useState(false);
  const [userList, setUserList] = useState([]);
  const [isFetching, setisFetching] = useState(false);
  const [page, setpage] = useState(1);
  const baseApi = 'https://randomuser.me/api'
  const seedKey = 'albertseed'
  const limit = 10;
  
  const genderOptions = ['all', 'female', 'male'];
  
  const fetchUsers = async ({
    genderFilterParam=genderFilter,
    sortByParam=sortBy,
    isAscParam=isAsc,
    queryTextParam=queryText,
    pageParam=page
  }) => {
    setGenderFilter(genderFilterParam)
    setSortBy(sortByParam)
    setisAsc(isAscParam)
    setqueryText(queryTextParam)
    setpage(pageParam)
    
    const queryGenerator = {
      'seed': seedKey,
      'results': limit,
      'gender': genderFilterParam,
      'inc': 'login,name,email,gender,registered',
      'sortBy': sortByParam,
      'sortOrder': isAscParam ? 'ascend' : 'descend',
      'keyword': queryTextParam,
      'page': pageParam,
    }
    const query = Object.entries(queryGenerator).map((q) => {
      return q[0] + '=' + q[1];
    }).join('&');
    const apiUrl = baseApi + '?' + query;
    setisFetching(true)
    
    try {
      let userResponse = await fetch(apiUrl)
      userResponse = userResponse.json()
      console.log({userResponse})
      setisFetching(false)
      return userResponse
    } catch (e) {
      alert('Error when fetching users data, see log for detail');
      console.error(e)
      setisFetching(false)
      return {info:null, results:[]}
    }
  }
  
  const resetFilter = async () => {
    const userFetch = await fetchUsers({genderFilterParam:'all', sortByParam:'name', isAscParam:false, queryTextParam:null, pageParam:1})
    setUserList(userFetch.results)
  }
  
  useEffect(() => {
    resetFilter()
  }, []);
  
  const loadingTable = (
    <tr>
      <td colSpan="6" className="border border-gray-100 p-4 text-center">Fetching Data ...</td>
    </tr>
  )
  const tableUsers = (
    <table className='w-full'>
      <tbody>
        <tr className='grid grid-cols-8 gap-4 bg-gray-100 border-b border-gray-200 p-4 text-left'>
          <td><span>Username</span></td>
          <td><span>Name</span></td>
          <td className='col-span-2'><span>Email</span></td>
          <td><span>Gender</span></td>
          <td className='col-span-3'><span>Registered Date</span></td>
        </tr>
        {
          isFetching ? loadingTable :
          userList.map((u, userIdx) => {
            const defaultClass = 'border border-gray-100 p-4 break-all';
            return (
              <tr className='grid grid-cols-8' key={userIdx}>
                <td className={defaultClass}>{u?.login?.username}</td>
                <td className={defaultClass}>{
                  [u?.name?.first, u?.name?.last].join(' ')
                }</td>
                <td className={defaultClass + ' col-span-2'}>{u?.email}</td>
                <td className={defaultClass}>{u?.gender}</td>
                <td className={defaultClass + ' col-span-3'}>{u?.registered?.date}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
  
  return (
    <div className="p-10 w-full">
      <Head>
        <title>User Management (Next.js)</title>
        <meta name="description" content="User Management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-2xl font-semibold">
          <a href="https://nextjs.org">Next.js</a> user management
        </h1>
        
        <div className="mt-10 grid grid-cols-6 gap-4 items-end">
          <div className="col-span-2">
            <SearchInput onSearch={(str) => fetchUsers({queryTextParam:str, pageParam:1})} /> 
          </div>
          <div className="col-span-1">
            <GenderSelect options={genderOptions} onChangeValue={(str) => fetchUsers({genderFilterParam:str, pageParam:1})} /> 
          </div>
          <div className="col-span-1">
            <button type='button' onClick={() => resetFilter()} className='px-4 py-2 border border-gray-400 hover:bg-gray-200 cursor-pointer rounded-md'>Reset Filter</button>
          </div>
        </div>
        
        <div className="mt-4">
          {tableUsers}
        </div>
      </main>
    </div>
  )
}
