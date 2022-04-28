import {useEffect, useRef} from "react";

type DependencyArray = Array<any>;
type DependencyCallback = (...params: any[]) => any;

export default function useEffectAfterMount(callback: DependencyCallback, dependencies: DependencyArray) {
    const componentJustMounted = useRef(true);
    useEffect(() => {
        if (!componentJustMounted.current) {
            return callback();
        }
        componentJustMounted.current = false;
    }, dependencies);
}