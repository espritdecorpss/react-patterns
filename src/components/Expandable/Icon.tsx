import {useContext} from "react";
import {ExpandableContext} from "./Expandable";
import {IPropChildren, IPropClassName} from "./types";
import './Icon.styles.css';

interface IIconProps extends IPropClassName, IPropChildren {}

const Icon = ({ children, className = '', ...props }: IIconProps) => {
    const { expanded } = useContext(ExpandableContext);
    const combinedClassName = ['Expandable-icon', className].join('');

    return (
        <span className={combinedClassName} {...props}>
            {expanded ? '-' : '+'}
        </span>
    );
};

export default Icon;