"use client"
import { Metadata } from 'next';
import { getWebNavigationDetail, getWebNavigationList } from '@/network/webNavigation';
import { CircleArrowRight } from 'lucide-react';
// import { getTranslations } from 'next-intl/server';
import { Separator } from '@/components/ui/separator';
import BaseImage from '@/components/image/BaseImage';
import MarkdownProse from '@/components/MarkdownProse';
import WebNavCardList from '@/components/webNav/WebNavCardList';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { WebNavigationListRow } from '@/lib/data';
import SecondaryNavigation from '../../category/secondaryNavigation';


// export async function generateMetadata({
//   params: { locale, websiteName },
// }: {
//   params: { locale: string; websiteName: string };
// }): Promise<Metadata> {
//   const t = await getTranslations({
//     locale,
//     namespace: 'Metadata.ai',
//   });
//   const res = await getWebNavigationDetail(websiteName);

//   return {
//     title: `${res.data?.title || 'Default Title'} | ${t('titleSubfix')}`,
//     description: res.data?.content || 'Default Description',
//   };
// }

export default function Page({ params: { websiteName } }: { params: { websiteName: string[] } }) {
  const [resData, setResData] = useState<Record<string, any>>({});
  const [resList, setResList] = useState<WebNavigationListRow[]>([]);
  const [categorizedList, setCategorizedList] = useState<Record<string, any[]>>({});
  const t = useTranslations('Startup.detail');
  const categoryName = websiteName[1].replace(/%20/g, ' ').replace(/%26/g, '&');
  const getDatas = async () => {
    const res = await getWebNavigationDetail(websiteName[0]);
    const resAllList = await getWebNavigationList({ pageNum: 1, pageSize: 100 });
    const { data } = res;
    setResData(data);
    const resListFiltered = resAllList.rows.filter((item: any) => item.categoryName === categoryName);
    setResList(resListFiltered);
  };

  useEffect(() => {
    if (window.sessionStorage.getItem('categorized')) {
      const categorizedData = JSON.parse(window.sessionStorage.getItem('categorized') as string);
      setCategorizedList(categorizedData);
    }
    getDatas();
  }, [websiteName])
  // if (!data) return null;

  return (
    <div className='w-full'>
      <div className='flex flex-col px-6 py-5 lg:h-[323px] lg:flex-row lg:justify-between lg:px-0 lg:py-10'>
        <div className='flex flex-col items-center lg:items-start'>
          <div className='space-y-1 text-balance lg:space-y-3'>
            <h1 className='text-2xl lg:text-5xl'>{resData.title}</h1>
            <h2 className='text-xs lg:text-sm'>{resData.content}</h2>
          </div>
          <a
            href={resData.url}
            target='_blank'
            rel='noreferrer'
            className='flex-center mt-5 min-h-5 w-full gap-1 rounded-[8px] bg-white p-[10px] text-sm capitalize text-black hover:opacity-80 lg:mt-auto lg:w-[288px]'
          >
            {t('visitWebsite')} <CircleArrowRight className='size-[14px]' />
          </a>
        </div>
        <a
          href={resData.url}
          target='_blank'
          rel='noreferrer'
          className='flex-center group relative h-[171px] w-full flex-shrink-0 lg:h-[234px] lg:w-[466px]'
        >
          <BaseImage
            title={resData.title}
            alt={resData.title}
            // width={466}
            // height={243}
            fill
            src={resData.thumbnailUrl || '#'}
            className='absolute mt-3 aspect-[466/234] w-full rounded-[16px] border border-[#424242] bg-[#424242] bg-cover lg:mt-0'
          />
          <div className='absolute inset-0 z-10 hidden items-center justify-center gap-1 rounded-[16px] bg-black bg-opacity-50 text-2xl text-white transition-all duration-200 group-hover:flex'>
            {t('visitWebsite')} <CircleArrowRight className='size-5' />
          </div>
        </a>
      </div>
      <Separator className='bg-[#010101]' />
      <div className='mb-5 px-3 lg:px-0'>
        <h2 className='my-5 text-2xl text-white/40 lg:my-10'>{t('introduction')}</h2>
        <MarkdownProse markdown={resData?.detail || ''} />
      </div>
      <div className='mb-5 px-3 lg:px-0'>
        <h2 className='mb-3 mt-10 text-center text-[32px]'>{t('moretool') || '相关AI工具'}</h2>
        <WebNavCardList isShowSearch={false} dataList={resList.slice(0, 4)} />
        <SecondaryNavigation dataList={categorizedList[categoryName]} type={categoryName} title='relatedCategories' />
      </div>
    </div>
  );
}
