import _range from 'lodash/range'

const Pagination = ({activePage, pageCount=5, onPageClick}) => {
    const pageCollection = _range(1, pageCount+1)
    const wrapperCls = 'cursor-pointer border w-8 text-center px-2 py-1 rounded-sm text-sm'
    const standbyCls = 'text-gray-500 border-gray-300 hover:bg-blue-50'
    
    const prevBtnCls = (activePageParam) => {
        const finalCls = [wrapperCls, standbyCls]
        const isDisabled = activePageParam <= 1
        if(isDisabled) {
            finalCls.push('opacity-50 cursor-not-allowed')
        } // endif
        return finalCls.join(' ')
    }
    const nextBtnCls = (activePageParam) => {
        const finalCls = [wrapperCls, standbyCls]
        const isDisabled = activePageParam >= pageCount
        if(isDisabled) {
            finalCls.push('opacity-50 cursor-not-allowed')
        } // endif
        return finalCls.join(' ')
    }
    return (
        <div className='flex gap-2'>
            <div onClick={() => activePage <= 1 ? null : onPageClick(activePage-1)} 
                className={prevBtnCls(activePage)}>
                {'<'}
            </div>
            {
                pageCollection.map(page => {
                    let dynamicClass = standbyCls
                    if(page === activePage) {
                        dynamicClass = 'text-blue-500 border-blue-500'
                    } // endif
                    return (
                        <div onClick={() => page === activePage ? null : onPageClick(page)} 
                            key={page} 
                            className={`${[wrapperCls,dynamicClass].join(' ')}`}>
                            {page}
                        </div>
                    )
                })
            }
            <div onClick={() => activePage >= pageCount ? null : onPageClick(activePage+1)} 
                className={nextBtnCls(activePage)}>
                {'>'}
            </div>
        </div>
    );
}

export default Pagination;