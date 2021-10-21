import * as React from 'react';


export default React.forwardRef((props, ref) => {
    const [state,setState]= React.useState(props.children);  
    const innerRef = React.useRef();
    React.useEffect(() => {
        // Update the document title using the browser API
        innerRef.current.addEventListener("mouseup",event=>{
            const selection = window.getSelection();
            console.log(selection,selection.getRangeAt(0));
        })
      });

    React.useImperativeHandle(ref, () => ({
        setState() {
            setState("ha ha ha ha")
        },

    }));
    return <div ref={innerRef} data-component="text">{state}</div>;
});
