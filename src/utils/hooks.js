import { useEffect, useState } from "react";

function useWindowVisible(cb, bool = true) {
  let [visible, setVisible] = useState(true);
  function callback(event) {
    let webkitHidden = event.target.webkitHidden
    setVisible(webkitHidden);
    webkitHidden === bool && cb();
  }
  useEffect(() => {
    window.addEventListener("webkitvisibilitychange", callback);
    return () => window.removeEventListener("webkitvisibilitychange", callback);
  }, [cb]);
  return [visible];
}

export { useWindowVisible };
