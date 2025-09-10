import { searchData } from "../dummyData";

export async function fetchSearchedData(query:string){
    await new Promise<void>((resolve)=>{
        const randomDelay = (Math.random() * 2 + 1) * 1000;
        console.log("randomDelayy: ",randomDelay)
        setTimeout(()=>{return resolve()},randomDelay)
    });

    const filteredData = searchData.filter((item)=>item.name.trim().toLowerCase().includes(query.trim().toLowerCase()));

   return filteredData ;

}