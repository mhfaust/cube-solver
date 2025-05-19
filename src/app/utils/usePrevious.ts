import { useEffect, useRef } from "react";

// Influenced by https://usehooks.com/usePrevious/
// and https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
function usePrevious(value: any) {
  const ref = useRef();

  // useEffects are triggered *after* render cycles.
  // By setting the ref's value in useEffect, we ensure what is returned is what was set  
  // before this, on the previous render, not the current render
  useEffect(() => {
    console.log('VALUE CHANGED')

    ref.current = value;
  }, [value]); 

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

export default usePrevious;
