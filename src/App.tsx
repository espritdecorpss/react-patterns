import {useState} from 'react';
import Expandable from "./components/Expandable";
import './App.styles.css';
import useExpand from "./hooks/useExpand";
import useEffectAfterMount from "./hooks/useEffectAfterMount";

const information = [
    {
        header: 'Why everyone should live forever',
        note: 'This is highly sensitive information ... !!!!'
    },
    {
        header: 'The internet disappears',
        note: 'I just uncovered the biggest threat...'
    },
    {
        header: 'The truth about Elon musk and Mars!',
        note: 'Nobody tells you this...'
    }
];

const ControlledCompoundComponent = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const onExpand = (e: any) => {
        setActiveIndex(e.target.dataset.index);
    };
    return (
        <>
            {information.map(({ header, note }, index) => {
                // eslint-disable-next-line eqeqeq
                // @ts-ignore
                const expand = (index === Number(activeIndex));
                return (
                    <Expandable
                        key={index}
                        expand={expand}
                        onExpand={onExpand}
                    >
                        <Expandable.Header
                            style={{ color: 'red', border: '1px solid teal' }}
                            data-index={index}
                        >
                            {header}
                        </Expandable.Header>
                        <Expandable.Icon/>
                        <Expandable.Body>{note}</Expandable.Body>
                    </Expandable>
                );
            })}
        </>
    );
};

const Example = () => {
    const {expand, toggle} = useExpand();
    useEffectAfterMount(() => console.log('ebat'), [expand]);
    return (
        <div style={{ marginTop: '3rem' }}>
            <button onClick={toggle}>
                Click
            </button>
            {expand ? (
                <p>{'😎'.repeat(50)}</p>
            ) : null}
        </div>
    )
}

function App () {
    return (
        <div className="App">
            {/*<ControlledCompoundComponent />*/}
            <Example />
        </div>
    );
}

export default App;
