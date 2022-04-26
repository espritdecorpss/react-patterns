import {createContext, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {IPropChildren, IPropClassName} from "./types";
import Header from "./Header";
import Icon from "./Icon";
import Body from "./Body";
import './Expandable.styles.css';

interface IExpandableProps extends IPropClassName, IPropChildren {
    onExpand?: (expanded: boolean) => void
}

interface IExpandableContext {
    expanded: boolean
    toggle: () => void
}

export const ExpandableContext = createContext<IExpandableContext>({
    expanded: false,
    toggle: () => {
        throw new Error("toggle() in ExpandableContext isn't implemented");
    }
});
const { Provider } = ExpandableContext;

const Expandable = ({ children, onExpand, className = '', ...props }: IExpandableProps) => {
    const componentJustMounted = useRef(true);

    const [expanded, setExpanded] = useState(false);
    const toggle = useCallback(() => setExpanded(prevState => !prevState), []);

    useEffect(() => {
        if (!onExpand) return;

        if (!componentJustMounted.current) {
            onExpand(expanded);
        }
    }, [expanded]);

    const value = useMemo(() => ({ expanded, toggle }), [expanded, toggle]);
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