import { useEffect, useState, useRef } from "react";

const useOutsideAlerter = (initialValue) => {
  const [isComponentVisible, setIsComponentVisible] = useState(initialValue);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    return () => {
      document.addEventListener("click", handleClickOutside, true);
      return () =>
        document.removeEventListener("click", () => handleClickOutside, true);
    };
  });
  return { ref, isComponentVisible, setIsComponentVisible };
};

export default useOutsideAlerter;
