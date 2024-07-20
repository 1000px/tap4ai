'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

const StickyNav = (props: any) => {
  const { categorized, targetId } = props;
  const t = useTranslations('Category');

  const [activeAnchor, setActiveAnchor] = useState(categorized[0]);

  useEffect(() => {
    if (targetId) {
      setActiveAnchor(targetId);
    }
  }, [targetId]);

  return (
    <nav className='sticky top-[88px] hidden h-fit w-[238px] shrink-0 rounded-2xl bg-[#2C2D36] p-3 text-sm text-[#A5A3AC] lg:block'>
      <ol className='flex flex-col text-base'>
        {categorized.map((el: any) => (
          <li
            onClick={() => setActiveAnchor(el)}
            key={el}
            className={`line-clamp-1 flex h-10 w-full items-center justify-start
            rounded-xl ${el == activeAnchor ? 'border border-white/70 bg-[#414257] text-[#FFE600]' : ''} px-5`}
          >
            <a href={`#${el}`} className='w-full text-nowrap'>
              {t(el)}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default StickyNav;
