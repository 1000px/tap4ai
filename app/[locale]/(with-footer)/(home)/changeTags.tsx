'use client'
import Tags from '@/components/ui/tags';
import { useRouter } from 'next/navigation';

const ChangeTags = ({ dataList }: { dataList: any[] }) => {
    const router = useRouter();
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
    const changeTag = (tag: string) => {
        if (tag) {
            router.push(`/category#${tag}`)
            localStorage.setItem('tag', '');
        }
    }

    return (
        <Tags tags={tags} alldata={dataList} changeTag={changeTag} />
    );
};

export default ChangeTags;