import { ScrollToTopButton } from '@/components/ScrollToTopButton'

export const ScrollToTopComponent = ({ children, title }) => {
    return (
        <div>
            <h1 id="scroll-to-top" className="spinner-container">{title}</h1>
            {children}
            <ScrollToTopButton />
        </div >
    )
}