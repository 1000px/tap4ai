'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';


const Tags = ({ tags, changeTag, alldata }: { tags: string[]; changeTag: any; alldata: any }) => {
  const [selectedTag, setSelectedTag] = useState<string>('');
  const t = useTranslations('Category');

  const handleTagClick = (tag: string) => {
    if (tag == selectedTag) {
      setSelectedTag('');
      changeTag('');
      localStorage.setItem('tag', '');
      return;
    }
    localStorage.setItem('tag', tag);
    setSelectedTag(tag);
    changeTag(tag);
  };

  useEffect(() => {
    const tagName = localStorage.getItem('tag')!;
    setSelectedTag(tagName);
    changeTag(tagName);
  }, []);

  return (
    <div className='mt-5 flex flex-wrap justify-center gap-4'>
      {tags.map((tag, index) => {
        const num = alldata.filter((el: any) => el.categoryName === tag).length;
        return (
          <div
            key={index}
            onClick={() => handleTagClick(tag)}
            className={`cursor-pointer rounded-full border px-4 py-2 text-sm ${selectedTag === tag
              ? 'border-indigo-600 bg-indigo-600 text-white'
              : 'border-gray-300 bg-white text-gray-800'
              }`}
          >
            {t(tag)}
            <span style={{ marginLeft: '12px' }}>{num}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Tags;
