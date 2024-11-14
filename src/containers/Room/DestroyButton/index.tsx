

export const DestroyButton = (props: {onClick: () => void;}) => {
    return (
        <button onClick={props.onClick} className="w-8 h-8 flex items-center justify-center bg-[#D15A4C] border border-[#19191B]">
            <DeleteIco/>
        </button>
    )
}


const DeleteIco = () => {
    return (
        <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.08268 18.25V18.75H2.58268H15.416H15.916V18.25V5H16.3327H16.8327V4.5V2.66667V2.16667H16.3327H12.2493V1.75V1.25H11.7493H6.24935H5.74935V1.75V2.16667H1.66602H1.16602V2.66667V4.5V5H1.66602H2.08268V18.25ZM7.58268 6.83333V14.0833H6.74935V6.83333H7.58268ZM11.2493 6.83333V14.0833H10.416V6.83333H11.2493Z" fill="#D15A4C" stroke="#19191B"/>
        </svg>
    )
}