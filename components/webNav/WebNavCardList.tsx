'use client';

import { useEffect, useState } from 'react';

import { WebNavigationListRow } from '@/lib/data';

import Tags from '../ui/tags';
import WebNavCard from './WebNavCard';

export default function WebNavCardList({
  dataList,
  isShowSearch = true,
}: {
  dataList: WebNavigationListRow[];
  isShowSearch?: boolean;
}) {

  const [data, setData] = useState<any[]>([]);
  const [alldata, setalldata] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [tagName, setTagName] = useState<string>('');
  const tags = [
    'Image',
    'Video',
    'Productivity',
    'Text & Writing',
    'Business',
    'Chatbot',
    'Design & Art',
    'Code & IT',
    'Marketing',
    'Prompt',
    'Voice',
    'AI Detector',
    'Life Assistant',
    '3D',
    'Education',
    'Other',
  ];
  const changeTag = (name: string) => {
    setTagName(name);
  };

  const seachText = () => {
    const data = alldata.filter((el) => {
      if (!el) {
        return true;
      } else {
        return el.name?.indexOf(searchText!)! > -1;
      }
    });
    setData(data);
  };

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      seachText();
    }
  };

  useEffect(() => {
    if (alldata.length > 0) {
      if (!tagName) {
        setData(alldata);
        return;
      }
      setData(alldata.filter((el: any) => el.categoryName === tagName));
    }
  }, [tagName, alldata]);

  useEffect(() => {
    setalldata(dataList);
    setData(dataList);
  }, [dataList]);
  return (
    <div>
      {isShowSearch && (
        <div className='flex items-center justify-center'>
          <input
            type='text'
            className='w-64 rounded-lg border border-gray-600 px-4 py-2 text-black'
            placeholder='搜索'
            onChange={(e) => setSearchText(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className='ml-2 rounded-lg bg-gray-500 px-4 py-2 text-white' onClick={seachText}>
            搜索
          </button>
        </div>
      )}
      {isShowSearch && <Tags tags={tags} alldata={alldata} changeTag={changeTag} />}
      <div className='mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4'>
        {data?.map((item) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <WebNavCard  key={item.id} {...item} item={item} />
        ))}
      </div>
    </div>
  );
}
