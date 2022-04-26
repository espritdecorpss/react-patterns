import React, {createContext, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {IClassNameAttribute} from "./types";
import Header from "./Header";
import Icon from "./Icon";
import Body from "./Body";
import './Expandable.styles.css';

interface IExpandableProps extends IClassNameAttribute, React.HTMLAttributes<HTMLDivElement> {
    onExpand?: (expanded: boolean) => void
    expand?: boolean
}

interface IExpandableContext {
    expanded: boolean
    toggle: (...params: any[]) => void
}

export const ExpandableContext = createContext<IExpandableContext>({
    expanded: false,
    toggle: () => {
        throw new Error("toggle() in ExpandableContext isn't implemented");
    }
});
const { Provider } = ExpandableContext;

const Expandable = (
    {
        expand: externalExpanded, onExpand, // | - Defined props
        children, className = '', ...props  // | - Inherited props
    }
    : IExpandableProps) => {

    //Follow the start of the component lifecycle
    const componentJustMounted = useRef(true);
    //Determine a behaviour for the component
    const isExpandControlled = externalExpanded !== undefined;

    // | Main state |
    //-|------------|--
    const [internalExpanded, setInternalExpanded] = useState(false);
    const toggle = useCallback(() => setInternalExpanded(prevState => !prevState), []);
    //-|------------|--

    //If the component just mounted then skip the hook iteration
    useEffect(() => {
        if (!componentJustMounted.current && !isExpandControlled) {
            onExpand?.(internalExpanded);
            componentJustMounted.current = false;
        }
    }, [internalExpanded, externalExpanded, onExpand]);


    //Responsible state for the component
    const getExpanded = isExpandControlled ?
        (externalExpanded ? internalExpanded : externalExpanded)
        : internalExpanded;

    //Responsible function for state management
    const getToggleExpand = isExpandControlled ?
        (onExpand ? onExpand : toggle)
        : toggle;


    //Implement value of the context
    const value = useMemo(() =>
            ({ expanded: getExpanded, toggle: getToggleExpand }),
        [getExpanded, getToggleExpand]
    );
    //Combine passed style classes with the internal style class
    const combinedClassName = ['Expandable', className].join('');

    return (
      <Provider value={value}>
          <div className={combinedClassName} {...props}>
              {children}
          </div>
      </Provider>
    );
};

Expandable.Header = Header;
Expandable.Icon = Icon;
Expandable.Body = Body;

export default Expandable;