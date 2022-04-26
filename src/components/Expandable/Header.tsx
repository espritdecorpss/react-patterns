import React, {useContext} from "react";
import {ExpandableContext} from "./Expandable";
import {IClassNameAttribute} from "./types";
import './Header.styles.css';

interface IHeaderProps extends IClassNameAttribute, React.HTMLAttributes<HTMLButtonElement> {}

const Header = ({ children, className = '', ...props }: IHeaderProps) => {
    const { toggle } = useContext(ExpandableContext);

    const combinedClassName = ['Expandable-trigger', className].join('');

    return (
        <button
            className={combinedClassName}
            onClick={toggle}
            {...props}
        >
            {children}
        </button>
    );
};

export default Header;