
'use client'
import { useEffect, useRef, useState } from 'react';
import { getWebNavigationList } from '@/network/webNavigation';
import { useTranslations } from 'next-intl';
import Empty from '@/components/Empty';
import StickyNav from '@/components/explore/StickyNav';
import Faq from '@/components/Faq';
import WebNavCardList from '@/components/webNav/WebNavCardList';
import SecondaryNavigation from './secondaryNavigation';
import ExploreBreadcrumb from '@/components/explore/ExploreBreadcrumb';

const categorized: any = {};
export default function Content({
  headerTitle,
}: {
  headerTitle: string;
}) {

  const t = useTranslations('Category');
  const containerRef: any = useRef(null);
  const [navigationList, setNavigationList] = useState<any[]>([]);
  const [targetId, setTargetId] = useState<string>('');
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
    // 全局存储
    window.sessionStorage.setItem('categorized', JSON.stringify(categorized));
    setNavigationList(navigationList1);
  };
  const setHashPosition = () => {
    const hashStr1 = window.location.hash.substring(1).replace(/%20/g, ' ');
    const contactUs = document.getElementById(hashStr1);
    if (contactUs) {
      setTimeout(() => {
        contactUs.scrollIntoView(true);
        setTargetId(hashStr1);
      }, 500)
    }
  }
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
    if (window.location.hash) {
      setHashPosition()
    } else {
      setTargetId('');

    }
    window.addEventListener('scroll', handleScroll);
    getData();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    if (window.location.hash) {
      setHashPosition()
    }
  }, [navigationList])
  return (
    <div>
      <div className='mx-auto flex flex-col gap-3 py-5 lg:pt-10'>
        <h1 className='text-center text-[28px] font-bold lg:text-5xl'>{headerTitle}</h1>
        <div className='mx-auto'>
          <ExploreBreadcrumb
            linkList={[
              {
                href: '/',
                title: t('home'),
              },
              {
                title: t('allCategory'),
                isLast: true,
              },
            ]}
          />
        </div>
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
                          <a href={`#${el}`}>{t(el)} | ⭐️️{t('Featured')}</a>
                        </h2>
                        <WebNavCardList isShowSearch={false} dataList={categorized[el].slice(0, 4)} />
                        <SecondaryNavigation dataList={categorized[el]} type={el} title='moreCategory' />

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

    </div>
  );
}
