import { React ,useEffect } from 'react';
import Link from 'next/link';
import ReactGA from "react-ga4";
import Landing from './buyer/landing/landing'
ReactGA.initialize("G-E36KXVXBE5");
const Index = () => {
    return (

          <Landing></Landing>

      );}
export default Index
/*

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-E36KXVXBE5"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-E36KXVXBE5');
</script>

*/