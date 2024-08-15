import React from "react";

export default function Button({children, onClick, className}: {children: React.ReactNode, onClick: React.MouseEventHandler<HTMLDivElement> | undefined; className?: string
}) {
    return(
        <div className={className ? className : "btn btn-md btn-info"} onClick={onClick}>
            {children}
        </div>
    )
    
}