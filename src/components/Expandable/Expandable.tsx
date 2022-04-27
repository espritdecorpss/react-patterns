import React, { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { IClassNameAttribute } from "./types";
import Header from "./Header";
import Icon from "./Icon";
import Body from "./Body";
import './Expandable.styles.css';

type Expand = boolean
type ExpandCallback = (...params: any[]) => void

type Source = Expand | ExpandCallback
type AvailableControlSources<Type extends Source> = { internal: Type, external?: Type }
type GetControlledSource = <Type extends Source>(sources: AvailableControlSources<Type>) => Type

interface IExpandableProps extends IClassNameAttribute, React.HTMLAttributes<HTMLDivElement> {
    expand?: Expand
    onExpand?: ExpandCallback
}

interface IExpandableContext {
    expand: Expand
    onExpand: ExpandCallback
}

export const ExpandableContext = createContext<IExpandableContext>({
    expand: false,
    onExpand: () => {
        throw new Error("toggle() in ExpandableContext isn't implemented");
    }
});
const { Provider } = ExpandableContext;

const Expandable = (
    {
        expand: externalExpand,             // |-- Defined props
        onExpand: externalOnExpand,         // |
                                            // |
        children, className = '', ...props  // |-- Inherited props
    }: IExpandableProps) => {

    //Follow the start of the component lifecycle
    const componentJustMounted = useRef(true);
    //Determine a behaviour for the component
    const isExpandControlled = (externalExpand !== undefined);

    // Expand state |
    //--------------|--
    const [internalExpand, setInternalExpand] = useState<Expand>(false);
    const internalOnExpand = useCallback(() => setInternalExpand(prevState => !prevState), []);
    //--------------|--

    //If the component just mounted then skip the hook iteration
    useEffect(() => {
        //If the component is just mounted and isn't controlled then skip the hook iteration
        if (!componentJustMounted.current && !isExpandControlled) {
            externalOnExpand?.(internalExpand);
        }
        componentJustMounted.current = false;
    }, [internalExpand, externalExpand, externalOnExpand, isExpandControlled]);

    const getSource: GetControlledSource = ({ internal, external }) => {
        if (isExpandControlled && external !== undefined) return external;
        return internal;
    };

    //Managed state of the component
    const expand = getSource<Expand>({
        internal: internalExpand,
        external: externalExpand
    });

    //Responsible function for state management
    const onExpand = getSource<ExpandCallback>({
        internal: internalOnExpand,
        external: externalOnExpand
    });

    //Implement value of the context
    const value = useMemo(() => ({ expand, onExpand }), [expand, onExpand]);
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