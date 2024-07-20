'use client'
import { useEffect, useState } from 'react';
import { DataListRow } from '@/lib/data';
import MoreCategory from '@/components/ui/moreCategory';
import Link from 'next/link';

type secondaryNavigationProps = {
  dataList: DataListRow[],
  type: string,
  title: string,
  secondaryName?: string,
}

export default function secondaryNavigation({ dataList, type, title, secondaryName }: secondaryNavigationProps) {

  const [secondaryCategorized, setSecondaryCategorized] = useState<{ [key: string]: DataListRow[] }>({});
  const [locale, setLocale] = useState('');
  useEffect(() => {
    const localeStr = document.cookie
      .split(';')
      .find((el) => el.indexOf('NEXT_LOCALE') > -1)
      ?.split('=')[1] || 'en';
    setLocale(localeStr);
  }, [])
  useEffect(() => {
    let secondaryCategorizedData: any = {}
    dataList?.forEach(item => {
      if (item.secondary_classification_en) {
        if (!secondaryCategorizedData[item.secondary_classification_en]) {
          secondaryCategorizedData[item.secondary_classification_en] = [];
        }
        secondaryCategorizedData[item.secondary_classification_en].push(item);
      }
    })

    setSecondaryCategorized(secondaryCategorizedData);
  }, [dataList]);

  const setItemI18n = (list: DataListRow) => {
    return list[`secondary_classification_${locale}`]
  }

  return (
    <>
      {Object.keys(secondaryCategorized)?.length > 0 && <MoreCategory title={title} />}
      <ul className="grid grid-cols-1 gap-x-4 gap-y-3 lg:grid-cols-3 mt-4">
        {
          Object.keys(secondaryCategorized)?.map((item: string, index: number) => {
            return (
              item !== secondaryName ? <li key={secondaryCategorized[item][0].secondary_classification_en}>
                <Link href={`/category/${type}-${secondaryCategorized[item][0].secondaryName}`}>
                  <div className="flex h-[34px] w-full items-center justify-between rounded-lg bg-[#2C2D36] px-3 text-sm">{setItemI18n(secondaryCategorized[item][0])}
                    <div className="text-[#FFE600]">{secondaryCategorized[item].length}</div>
                  </div></Link>
              </li> : null
            )

          })
        }
      </ul>
    </>
  )
}