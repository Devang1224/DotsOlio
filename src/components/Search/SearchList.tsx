import React from 'react'
import SearchItem from '../../ui/SearchItem'
import type { SearchData } from '../../types'
import {motion,easeInOut} from "framer-motion";


interface SearchListProps {
    searchData:SearchData[],
    searchQuery:string,
    isLoading:boolean,
}
const fadeInOut = (delay:number) => ({
  animate: {
    backgroundColor: [
      "#F4F4F4", 
      "#F2F2F2", 
      "#EDEDED", 
      "#EBEBEB", 
      "#F3F3F3", 
    ],
  },
  transition: {
    duration: 1,    
    repeat: Infinity,
    delay,
    ease: easeInOut,
  },
});

interface DummySearchItemProps {
  index: number;
}


const DummySearchItem = ({index}:DummySearchItemProps)=>{
    return (
  <motion.div
    initial={{opacity:0}}
    animate={{opacity:1}}
    transition={{duration: 0.5, delay: 0.3 + index * 0.1 }}

    className="flex items-center gap-4 border-b-primary-20 py-3 px-6 cursor-pointer">
      <motion.div
        {...fadeInOut(index * 0.1 + 0.08)}
        className="w-[40px] h-[40px] rounded-lg"
      />

      <div className="w-full space-y-2">
        <motion.div
          {...fadeInOut(index * 0.1 + 0.08)}
          className="h-2 w-[50%] rounded-lg"
        />
        <motion.div
          {...fadeInOut(index * 0.1 + 0.08)}
          className="h-2 w-[30%] rounded-lg"
        />
      </div>
    </motion.div>
    )
}

const SearchList = ({
    searchData,
    searchQuery,
    isLoading,
}:SearchListProps) => {
  return (

    
    <div className="max-h-[50vh] overflow-y-scroll  py-3 hide-scrollbar scroll-smooth">
             {isLoading && Array.from({ length: 6 }).map((_,i)=><DummySearchItem key={i} index={i}/>) }

              {!isLoading && searchData?.map((item,index) => (
                 <SearchItem data={item} key={item.id} index={index} searchQuery={searchQuery} />
              ))}

              {
                !isLoading && searchData?.length == 0  && (
                   <div className="text-center py-2 text-sm text-primary-50">
                    No Results Found
                  </div>
                )
              }

            </div>
  )
}

export default SearchList