import {useContext} from "react";
import {ExpandableContext} from "./Expandable";
import {IPropChildren, IPropClassName} from "./types";
import './Header.styles.css';

interface IHeaderProps extends IPropClassName, IPropChildren {}

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