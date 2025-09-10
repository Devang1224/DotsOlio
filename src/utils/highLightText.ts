import React from "react";


export function getHighlightedText(text:string,query:string){

    if(!query)return text;
    const q = query.trim();

    const regex = new RegExp(`(${q})`,"gi");
    const parts = text.split(regex);
     const updatedText =  parts.map((item,i)=>(
       item.toLowerCase() ===  q.toLowerCase()
    ? React.createElement("span", { key: i, className: "bg-[#FBE5CF] font-semibold" }, item)
    : item
     ));
     
     return updatedText;


}