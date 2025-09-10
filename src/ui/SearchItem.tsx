import type { SearchData } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faImage,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { getHighlightedText } from "../utils/highLightText";
import { Check, Link, SquareArrowOutUpRight } from "lucide-react";
import Tooltip from "./Tooltip";
import { useState } from "react";
import clsx from "clsx";


interface SearchItemProps {
  data: SearchData;
  index: number;
  searchQuery: string;
}

const SearchItem = ({ data, index, searchQuery }: SearchItemProps) => {
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const handleCopyLink = (state:boolean)=>{
      setIsLinkCopied(state);

      setTimeout(()=>setIsLinkCopied(false),2000);
  }

  const getSearchItemImage = (data: SearchData) => {

  if (data.type === "people") {
    return <img src={data.image} className="object-cover" />;
  }
  if(data.type === "folder"){
     return <FontAwesomeIcon
            icon={faFolder}
            className="text-primary-100"
            size="sm"
          />;
  }


    switch (data.fileType) {
      case "image":
        return (
          <FontAwesomeIcon
            icon={faImage}
            className="text-primary-100"
            size="sm"
          />
        );
      case "video":
        return (
          <FontAwesomeIcon
            icon={faPlay}
            className="text-primary-100"
            size="sm"
          />
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="flex items-center gap-4 border-[3px] border-x-0 border-t-0 border-b-primary-20 py-3 px-6 cursor-pointer hover:bg-primary-20 group"
      key={data.id}
    >
      <div className='relative'>
        <div className="w-[40px] h-[40px] bg-[#E7E7E7] rounded-lg overflow-hidden flex justify-center items-center">
        {getSearchItemImage(data)}
        </div>
         {data.type=='people' && <div className={clsx("w-[14px] h-[14px]  rounded-full border-2 border-white absolute bottom-0 right-0 translate-y-1 translate-x-1 z-20",
                                                  data.activity=='inactive' && "bg-red-400",data.activity=='active' && "bg-green-400",data.activity=='wasActive' && "bg-yellow-400")} />}
      </div>
      <div className="flex flex-1 items-center justify-between">
        <div className="">
          <p className="text-black text-start font-semibold">
            {getHighlightedText(data.name, searchQuery)}
          </p>
          <div className="flex items-center">
            {data.type != "people" && (
              <div className="flex items-center ">
                <span className="text-primary-100 text-sm">
                  in {data.location}
                </span>
                <span className="w-[5px] h-[5px] bg-primary-100 rounded-full mx-1 " />
              </div>
            )}
            <p className="text-primary-100 text-start text-sm">{data.status}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100">

            <Tooltip text={isLinkCopied ? "Link Copied!" : "Copy Link"} icon={isLinkCopied ? <Check className="text-white w-[12px]"/> : null}>
              <button
                onClick={()=>handleCopyLink(true)}
                className="cursor-pointer hover:bg-primary-30 p-1 rounded-md"
                >
                <Link className="text-primary-50 w-5" />
              </button>
            </Tooltip>
          
          <button className="flex item-center gap-1 text-primary-50 cursor-pointer">
            <SquareArrowOutUpRight className="w-5" />
            <p className="text-sm font-semibold">New Tab</p>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SearchItem;
