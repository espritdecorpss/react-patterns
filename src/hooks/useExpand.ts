import {useCallback, useMemo, useState} from "react";

export default function useExpand() {
    const [expand, setExpand] = useState(false);
    const toggle = useCallback(() => setExpand(prevState => !prevState), []);

    return useMemo(() => ({ expand, toggle }), [expand, toggle]);
}