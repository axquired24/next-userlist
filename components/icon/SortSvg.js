import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa'

const SortSvg = ({activeSort=null, size=12, color='#000', cls=null}) => {
    const defaultProperty = {
        size: size,
        color: color,
        title: 'Sorting'
    }
    const activeIcon = () => {
        switch (activeSort) {
            case 'ascend':
                return <FaSortUp {...defaultProperty} />
            case 'descend':
                return <FaSortDown {...defaultProperty} />
            default:
                return <FaSort {...defaultProperty} />
        }
    }
    return (
        <div className={cls}>
            {activeIcon()}
        </div>
    );
}

export default SortSvg;