'use client'
import { useEffect, useRef, useState } from 'react';
import { getWebNavigationList } from '@/network/webNavigation';
import { useTranslations } from 'next-intl';

import Empty from '@/components/Empty';
import StickyNav from '@/components/explore/StickyNav';
import Faq from '@/components/Faq';
import WebNavCardList from '@/components/webNav/WebNavCardList';
import SecondaryNavigation from './secondaryNavigation';

const categorized: any = {};
export default function Layout({ children }: { children: React.ReactNode }) {
  const containerRef: any = useRef(null);
  const t = useTranslations('Category');
  const [navigationList, setNavigationList] = useState<any[]>([]);
  const [targetId, setTargetId] = useState<''>('');
  const getData = async () => {
    const res = await getWebNavigationList({ pageNum: 1, pageSize: 500 });
    const navigationList1 = res.rows;
    navigationList1.forEach((item: any) => {
      if (!categorized[item.categoryName]) {
        categorized[item.categoryName] = [];
      }
      let isUnique = true;
      const categoryArray = categorized[item.categoryName];
      for (const existingItem of categoryArray) {
        if (existingItem.name === item.name) {
          isUnique = false;
          break;
        }
      }
      if (isUnique) {
        categorized[item.categoryName].push(item);
      }
    });
    setNavigationList(navigationList1);
  };


  useEffect(() => {
    const handleScroll = () => {
      const anchors = document.querySelectorAll('a[href^="#"]');

      anchors.forEach((anchor: any) => {
        const targetId1 = anchor.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId1);

        if (targetElement) {
          const rect = targetElement.getBoundingClientRect();
          const isInView =
            rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);

          if (isInView && rect.top < 50) {
            setTargetId(targetId1);
          }
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    getData();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className='mx-auto w-full max-w-pc scroll-smooth px-3 lg:px-0'>
      {children}
      <div className='mt-3'>
        {navigationList && !!navigationList?.length ? (
          <>
            <div data-orientation='horizontal' role='none' className='mb-6 h-px w-full shrink-0 bg-[#414257]'></div>
            <div className='mb-6 flex flex-row'>
              <div className='mr-10 flex-1'>
                {Object.keys(categorized).map((el) => {
                  return (
                    <div key={el} className='mt-5'>
                      <h2 id={el} className='scroll-mt-[88px] text-[20px]'>
                        <a href={`#${el}`}>{el} | ⭐️️Featured</a>
                      </h2>
                      <WebNavCardList isShowSearch={false} dataList={categorized[el].slice(0, 4)} />
                      <SecondaryNavigation dataList={categorized[el]} type={el} title=''/>

                    </div>
                  );
                })}
              </div>
              <StickyNav targetId={targetId} categorized={Object.keys(categorized)} />

            </div>
          </>
        ) : (
          <div className='mb-3 lg:mb-5'>
            <Empty title={t('empty')} />
          </div>
        )}
      </div>
      <Faq />
    </div>
  );
}
