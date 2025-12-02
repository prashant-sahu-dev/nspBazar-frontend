import './loader.css' ;
import { useEffect, useState } from "react";
import { Triangle } from 'react-loader-spinner'

const Loader = ()=>{
    const [headerHeight, setHeaderHeight] = useState(0);
    const [isAdding, setIsAdding] = useState(false);
  useEffect(() => {
      const header = document.querySelector(".header");
      const updateHeight = () => {
        if (header) setHeaderHeight(header.offsetHeight);
      };
      updateHeight();
      window.addEventListener("resize", updateHeight);
      return () => window.removeEventListener("resize", updateHeight);
    }, []);
    return <>
      <div class="my-spinner-class" style={{
        marginTop: `${headerHeight}px`,
        minHeight: `calc(100vh - ${headerHeight}px)`,
      }} role="status">
    <Triangle
      height={100}
      width={100}
      radius={9}
      color="green"
      ariaLabel="audio-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
</div>
    </>
}

export default Loader ;
