import React, {useContext} from "react";
import {ExpandableContext} from "./Expandable";
import {IClassNameAttribute} from "./types";
import './Body.styles.css';

interface IBodyProps extends IClassNameAttribute, React.HTMLAttributes<HTMLDivElement> {}

const Body = ({ children, className = '', ...props }: IBodyProps) => {
    const { expanded } = useContext(ExpandableContext);
    const combinedClassName = ['Expandable-panel', className].join('');

    return expanded ? (
        <div className={combinedClassName} {...props}>
            {children}
        </div>
    ) : null;
};

export default Body;