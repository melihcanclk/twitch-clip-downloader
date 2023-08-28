import { ScrollToTopButtonSvg } from '@/components/ScrollToTopButtonSvg';

export const ScrollToTopButton = () => {
    const goToHeader = () => {
        const element = document.getElementById('scroll-to-top');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div>
            <button
                className="scroll-to-top-button"
                onClick={goToHeader}
            >
                <ScrollToTopButtonSvg />
            </button>
        </div>
    );

}