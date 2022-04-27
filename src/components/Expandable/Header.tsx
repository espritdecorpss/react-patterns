import React, {useContext} from "react";
import {ExpandableContext} from "./Expandable";
import {IClassNameAttribute} from "./types";
import './Header.styles.css';

interface IHeaderProps extends IClassNameAttribute, React.HTMLAttributes<HTMLButtonElement> {}

const Header = ({ children, className = '', ...props }: IHeaderProps) => {
    const { onExpand } = useContext(ExpandableContext);

    const combinedClassName = ['Expandable-trigger', className].join('');

    return (
        <button
            className={combinedClassName}
            onClick={onExpand}
            {...props}
        >
            {children}
        </button>
    );
};

export default Header;