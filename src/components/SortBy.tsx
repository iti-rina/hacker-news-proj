import { FC, useState } from 'react';

interface SortByProps {
  active: string
}

const SortBy: FC<SortByProps> = ({ onSort }) => {
  let [curSortType, setCurSortType] = useState('new');
  const handleSort = (type) => {
    onSort(type);
    setCurSortType(type);
  };

  return (
    <div className='sorting-container'>
      <button onClick={() => handleSort('new')} className={curSortType === 'new' ? 'active-btn' : 'btn'}>
        new stories
      </button>
      <button onClick={() => handleSort('best')} className={curSortType === 'best' ? 'active-btn' : 'btn'}>
        best stories
      </button>
      <button onClick={() => handleSort('top')} className={curSortType === 'top' ? 'active-btn' : 'btn'}>
        top stories
      </button>
    </div>
  );
};

export default SortBy;
