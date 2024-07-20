
'use client'
import { RevalidateOneHour } from '@/lib/constants';
import { useTranslations } from 'next-intl';
import Content from './Content';

export const revalidate = RevalidateOneHour * 6;

export default async function Page() {
  const t = useTranslations('Category');
  return (
    // <></>
    <Content
      headerTitle={t('discover_ai')}
    // currentPage={1}
    // pageSize={InfoPageSize}
    // route={'/category'}
    />
  );
}
