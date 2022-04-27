import React, {useContext} from "react";
import {ExpandableContext} from "./Expandable";
import {IClassNameAttribute} from "./types";
import './Icon.styles.css';

interface IIconProps extends IClassNameAttribute, React.HTMLAttributes<HTMLSpanElement> {}

const Icon = ({ children, className = '', ...props }: IIconProps) => {
    const { expand } = useContext(ExpandableContext);
    const combinedClassName = ['Expandable-icon', className].join('');

    return (
        <span className={combinedClassName} {...props}>
            {expand ? '-' : '+'}
        </span>
    );
};

export default Icon;