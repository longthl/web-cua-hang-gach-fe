import React, { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
// import QrReader from 'react-qr-reader';
import {format} from 'date-fns';


function Scanner({closeModal,onScan,onClose}){
    const [scanResult,setScanResult]=useState(null);
    const [ngaySinh, setNgaySinh] = useState(null);
  const [hoTen, setHoTen] = useState(null);

useEffect(()=>{ 
   
 const scanner=new Html5QrcodeScanner('reader',{
qrbox:{
 width: 250,
 height: 250,
},
fps: 5,
});
scanner.render(success,error);

function success(result){
scanner.clear();

const regex = /\b\d{12}\b/;
const match = result.match(regex);
const cmndNumber = match ? match[0] : null;

if (cmndNumber) {
   
    const ngaySinhString = cmndNumber.slice(30, 18);
    const ngay = ngaySinhString.substring(0, 2);
    const thang = ngaySinhString.substring(2, 4);
    const nam = ngaySinhString.substring(4, 8);

    const ngaySinhFormatted = `${ngay}/${thang}/${nam}`;
    setNgaySinh(ngaySinhFormatted);

   
  }

setScanResult(cmndNumber);
onScan(cmndNumber);
}
function error(err){
console.warn(err);
}
return()=>{
    scanner.clear();
};
},[]);

return(
    
    <div>
      {hoTen && (
        <div>
          Họ tên: {hoTen}
        </div>
      )}

        {scanResult
        ? (
            <div>
                Số CMND: {scanResult}
            </div>
            )
        : (<div id='reader'></div>
       ) }
    </div>

    
);
}
export default Scanner;
