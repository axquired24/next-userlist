import Head from 'next/head'
import SearchInput from '@/components/SearchInput'
import GenderSelect from '@/components/GenderSelect';
import SortSvg from '@/components/icon/SortSvg';
import Pagination from '@/components/Pagination';
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
      'inc': 'login,name,email,gender,registered',
      'page': pageParam,
    }
    
    if(['male', 'female'].includes(genderFilterParam)) {
      queryGenerator.gender = genderFilterParam
    } // endif
    
    if(queryTextParam) {
      queryGenerator.keyword = queryTextParam
    } // endif
    
    if(sortByParam) {
      queryGenerator.sortBy = sortByParam
      queryGenerator.sortOrder = isAscParam ? 'ascend' : 'descend'
    }
    
    const query = Object.entries(queryGenerator).map((q) => {
      return q[0] + '=' + q[1];
    }).join('&');
    const apiUrl = baseApi + '?' + query;
    setisFetching(true)
    
    try {
      let userResponse = await fetch(apiUrl)
      userResponse = userResponse.json()
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
    const userFetch = await fetchUsers({genderFilterParam:'all', sortByParam:null, isAscParam:false, queryTextParam:null, pageParam:1})
    setUserList(userFetch.results)
  }
  
  const doSort = async (column, isAsc) => {
    const userFetch = await fetchUsers({genderFilterParam:genderFilter, sortByParam:column, isAscParam: isAsc, queryTextParam:queryText, pageParam:page})
    setUserList(userFetch.results)
  }
  
  const sortIconKind = (columnParam, isAscParam, activeColumn) => {
    if(columnParam === activeColumn) {
      return isAscParam ? 'ascend' : 'descend'
    } else {
      return null
    }
  }
  
  const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
  }
  
  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(':')
    );
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
        <tr className='grid grid-cols-8 bg-gray-100 border-b border-gray-200 text-left'>
          <td className="p-4"><span>Username</span></td>
          <td className="col-span-2 c__sort-wrapper" onClick={() => doSort('name', !isAsc)}>
              <span>Name</span>
              <SortSvg activeSort={sortIconKind('name', isAsc, sortBy)} />
          </td>
          <td className='col-span-2 c__sort-wrapper' onClick={() => doSort('email', !isAsc)}>
            <span>Email</span>
            <SortSvg activeSort={sortIconKind('email', isAsc, sortBy)} />
          </td>
          <td className="c__sort-wrapper" onClick={() => doSort('gender', !isAsc)}>
            <span>Gender</span>
            <SortSvg activeSort={sortIconKind('gender', isAsc, sortBy)} />
          </td>
          <td className='col-span-2 c__sort-wrapper' onClick={() => doSort('registered', !isAsc)}>
            <span>Registered Date</span>
            <SortSvg activeSort={sortIconKind('registered', isAsc, sortBy)} />
          </td>
        </tr>
        {
          isFetching ? loadingTable :
          userList.map((u, userIdx) => {
            const defaultClass = 'border border-gray-100 p-4 break-all';
            return (
              <tr className='grid grid-cols-8' key={userIdx}>
                <td className={defaultClass}>{u?.login?.username}</td>
                <td className={defaultClass + ' col-span-2'}>{
                  [u?.name?.first, u?.name?.last].join(' ')
                }</td>
                <td className={defaultClass + ' col-span-2'}>{u?.email}</td>
                <td className={defaultClass}>{u?.gender}</td>
                <td className={defaultClass + ' col-span-2'}>{formatDate(u?.registered?.date)}</td>
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
            <SearchInput onSearch={(str) => fetchUsers({queryTextParam:str, pageParam:1})} queryText={queryText} /> 
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
        
        <div className="mt-2 flex justify-end">
          <Pagination activePage={page} pageCount={5} onPageClick={destPage => fetchUsers({pageParam: destPage})} />
        </div>
      </main>
    </div>
  )
}
