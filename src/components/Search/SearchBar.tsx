import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import SearchTabs from "./SearchTabs";
import { AnimatePresence, motion } from "framer-motion";
import SearchList from "./SearchList";
import { fetchSearchedData } from "../../services/fetchData";
import type { SearchData } from "../../types";
import debounce from "lodash.debounce";
import Loader from "../../ui/Loader";


const SearchBar = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const [filteredData,setFilteredData] = useState<SearchData[]>([]);
  const [isLoading,setIsLoading] = useState(false);

const fadeInOut = {
    initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.2 } },
  // transition: { delay: 0.2 },
};


const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
         handleFetchResults(value)
      }, 300),
    []
  );

const handleFetchResults = async (value:string)=>{
  try{
    setIsLoading(true);
     const res = await fetchSearchedData(value.trim());
     console.log(res);
    setFilteredData([...res]);
  }catch(err){

  }finally{
    setIsLoading(false);
  }


}

const handleSearch = (query:string)=>{
   setSearchInput(query);
   if (!query.trim()) {
    setFilteredData([]);
    debouncedSearch.cancel();
    return;
  }
   debouncedSearch(query);
}



  return (
    <div className="flex justify-center ">
      <div className=" min-w-[600px]  bg-white rounded-[15px] shadow-primary border-1">
        <div className="p-4 flex justify-between items-center ">
          <div className="flex gap-2 items-center flex-1">
            {
              isLoading ? <Loader/> : <Search className="text-primary-100 w-5" />
            }
            
            <input
              type="text"
              placeholder="Searching is easier"
              className="text-black text-[18px] placeholder:text-primary-100 outline-0 flex-1 "
              value={searchInput}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
     <AnimatePresence mode='wait'>
      {
        !searchInput ? <motion.div key="quick_access" {...fadeInOut}
        className="text-primary-200 flex items-center gap-2">
            <div className="relative flex justify-center w-[23px] h-[25px] border-1 border-gray-300  rounded-lg text-[12px] before:content-[''] before:absolute before:w-full before:h-full before:rounded-lg before:-top-0.5 before:left-0 before:border-1 before:border-x-0 before:border-t-0 before:border-gray-300 ">
              <span>s</span>
            </div>
            <p className="text-[10px] font-medium">quick access</p>
          </motion.div> : (
            <motion.button
              key="clear"
             initial={{opacity:0}}
             animate={{opacity:1}}
             exit={{
              opacity:0,
              transition:{ delay:0.3}
             }}
             transition={{delay:0.1}}
            className="cursor-pointer" onClick={()=>setSearchInput("")}>
               <p className="text-black underline text-sm font-semibold">Clear</p> 
            </motion.button>
            )
          }
     </AnimatePresence>

        </div>

     <AnimatePresence>
        {searchInput && (
          <motion.div
           initial={{ maxHeight: 0, opacity: 0 }}
           animate={{ maxHeight: 500, opacity: 1 }} 
            exit={{
              maxHeight: 0,
              transition: {
                delay: 0.2,
                duration: 0.7,
                ease: [0.66, 0, 0.341, 1.014],
              },
            }}
            transition={{
              delay: 0.2,
              duration: 0.7,
              ease: [0.66, 0, 0.341, 1.014],
            }}
            className="overflow-hidden "
          >
            <div className="">
              <SearchTabs activeTab={activeTab} setActiveTab={setActiveTab} filteredData={filteredData} />
            </div>
            {/* List */}
            <SearchList searchData={filteredData} isLoading={isLoading} searchQuery={searchInput}/>
          </motion.div>
        )}
</AnimatePresence>

      </div>
    </div>
  );
};

export default SearchBar;
