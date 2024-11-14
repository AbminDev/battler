export {}

interface ModalTitleProps {
    title: string;
    onClickClose: () => void;
}

export const ModalTitle = (props: ModalTitleProps) => {
    const { title, onClickClose } = props;

    return (
        <div className="bg-light-gray py-4 text-center">
            <button className="absolute right-12" onClick={onClickClose}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.60247 15.1367C9.41047 15.1367 9.21847 15.0637 9.07247 14.9167C8.77947 14.6237 8.77947 14.1497 9.07247 13.8567L13.8645 9.06471C14.1575 8.77171 14.6315 8.77171 14.9245 9.06471C15.2175 9.35771 15.2175 9.83171 14.9245 10.1247L10.1325 14.9167C9.98647 15.0637 9.79447 15.1367 9.60247 15.1367Z" fill="black"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M14.3965 15.1396C14.2045 15.1396 14.0125 15.0666 13.8665 14.9196L9.07052 10.1226C8.77752 9.8296 8.77752 9.3556 9.07052 9.0626C9.36452 8.7696 9.83852 8.7696 10.1305 9.0626L14.9265 13.8596C15.2195 14.1526 15.2195 14.6266 14.9265 14.9196C14.7805 15.0666 14.5875 15.1396 14.3965 15.1396Z" fill="black"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.665 3.5C5.135 3.5 3.5 5.233 3.5 7.916V16.084C3.5 18.767 5.135 20.5 7.665 20.5H16.333C18.864 20.5 20.5 18.767 20.5 16.084V7.916C20.5 5.233 18.864 3.5 16.334 3.5H7.665ZM16.333 22H7.665C4.276 22 2 19.622 2 16.084V7.916C2 4.378 4.276 2 7.665 2H16.334C19.723 2 22 4.378 22 7.916V16.084C22 19.622 19.723 22 16.333 22Z" fill="black"/>
                </svg>
            </button>
            <p>{title}</p>
        </div>
    );
};
