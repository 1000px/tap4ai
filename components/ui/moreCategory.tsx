import { useTranslations } from 'next-intl';


export default function Loading({ title }: { title?: string }) {
    const t = useTranslations('Category');
    return (
        <div className="flex w-full items-center justify-center gap-3 mt-4"><div data-orientation="horizontal" role="none" className="shrink-0 h-[1px] w-1/4 bg-[#414257] lg:w-[300px]"></div><div className="text-sm text-[#696B79]">{t(title)}</div><div data-orientation="horizontal" role="none" className="shrink-0 h-[1px] w-1/4 bg-[#414257] lg:w-[300px]"></div></div>
    );
}
