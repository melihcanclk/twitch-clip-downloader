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
                style={{
                    position: 'fixed',
                    bottom: '1rem',
                    right: '1rem',
                    zIndex: 1000,
                }}
                onClick={goToHeader}
            >
                Scroll to top
            </button>
        </div>
    );

}