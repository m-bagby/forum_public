import {useState, useEffect} from "react";

//Get whether an element is visible
const useIntersectingObserver = (ref) => {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = new IntersectionObserver(
    ([entry]) => setIntersecting(entry.isIntersecting)
  );

  //Use observer to check if ref element is visible
  useEffect(() => {
    observer.observe(ref.current);
    //handle unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return isIntersecting;
};


export default useIntersectingObserver;