'use client'
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import ExploreBreadcrumb from '@/components/explore/ExploreBreadcrumb';
import { getWebNavigationList } from '@/network/webNavigation';
import WebNavCardList from '@/components/webNav/WebNavCardList';
import SecondaryNavigation from '../secondaryNavigation';
export default function Content({
  routerStr
}: {
  headerTitle: string;
  routerStr: string;
}) {

  const t = useTranslations('Category');
  const braeadcrumbTitle = routerStr.split('-')[0].replace('~', ' & ');
  const braeadcrumbTitle1 = routerStr.split('-')[1];
  const [navigationList, setNavigationList] = useState<Record<string, any[]>>({});
  const [categorizedList, setCategorizedList] = useState<Record<string, any[]>>({});
  const [locale, setLocale] = useState('');
  useEffect(() => {
    const localeStr = document.cookie
      .split(';')
      .find((el) => el.indexOf('NEXT_LOCALE') > -1)
      ?.split('=')[1] || 'en';
    setLocale(localeStr);
  }, []);

  const getData = async () => {
    const categorized: Record<string, any[]> = {};
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
    setCategorizedList(categorized);
  };
  useEffect(() => {
    if (window.sessionStorage.getItem('categorized')) {
      const categorized = JSON.parse(window.sessionStorage.getItem('categorized') as string);
      setCategorizedList(categorized);
    } else {
      getData();
    }
  }, [braeadcrumbTitle, braeadcrumbTitle1]);
  useEffect(() => {
    let secondaryCategorizedData: any = {}
    categorizedList[braeadcrumbTitle]?.forEach(item => {
      if (item.secondaryName) {
        if (!secondaryCategorizedData[item.secondaryName]) {
          secondaryCategorizedData[item.secondaryName] = [];
        }
        secondaryCategorizedData[item.secondaryName].push(item);
      }
    })
    setNavigationList(secondaryCategorizedData);
  }, [categorizedList]);
  return (
    <div>
      <div className='mx-auto flex flex-col gap-3 py-5 lg:pt-10'>
        <h1 className='text-center text-[28px] font-bold lg:text-5xl'>{t(braeadcrumbTitle)}-{t(braeadcrumbTitle1)}</h1>
        <div className='mx-auto'>
          <ExploreBreadcrumb
            linkList={[
              {
                href: '/',
                title: t('home'),
              },
              {
                href: '/category',
                title: t(braeadcrumbTitle),
              },
              {
                href: `/category/${routerStr}`,
                title: t(braeadcrumbTitle1),
                isLast: true,
              },
            ]}
          />
        </div>
        <WebNavCardList isShowSearch={false} dataList={navigationList?.[braeadcrumbTitle1] ?? []} />
        <SecondaryNavigation dataList={categorizedList[braeadcrumbTitle]} type={braeadcrumbTitle} title='relatedCategories' secondaryName={braeadcrumbTitle1} />
      </div>
    </div>
  );
}
