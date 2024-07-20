export default function CategoryLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='mx-auto w-full max-w-pc scroll-smooth px-3 lg:px-0'>
            {children}
        </div>
    );
}