import clsx from "clsx";
import {
  Menu,
  MessageCircle,
  Paperclip,
  Settings,
  UserRound,
  type LucideProps,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import RadioBtn from "../../ui/RadioBtn";
import { AnimatePresence, motion } from "framer-motion";
import AnimateNumber from "../../ui/AnimateNumber";
import type { SearchData, SearchDataTypes } from "../../types";

interface SearchTabsProps {
  setActiveTab: Dispatch<SetStateAction<string>>;
  activeTab: string;
  filteredData:SearchData[]
}

interface Tab {
  type: "all" | SearchDataTypes;
  name: string;
  value: number;
  icon?:React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}

const dummyTabs = [
  {
    name: "Files",
    icon: Paperclip,
    type:'file',
    value: 0,
  },
  {
    name: "People",
    type:'people',
    icon: UserRound,
    value: 0,
  },
  {
    name: "Chats",
    type:"chats",
    icon: MessageCircle,
  },
  {
    name: "Lists",
    type:"lists",
    icon: Menu,
  },
];

const SearchTabs = ({ setActiveTab, activeTab, filteredData }: SearchTabsProps) => {
  const [tabs, setTabs] = useState<Tab[]>([
    {
      name: "All",
      type:"all",
      value: 0,
    },
    {
      type:"file",
      name: "Files",
      icon: Paperclip,
      value: 0,
    },
    {
      type:"people",
      name: "People",
      icon: UserRound,
      value: 0,
    },
  ]);

  const [isActiveSettings, setIsActiveSettings] = useState(false);

  const handleUpdateTab = (tab, isActive:boolean) => {
    const typesSizes = getTypesSize();

    if (isActive) {
      setTabs((prev) => prev.filter((item) => item.name != tab.name));
    } else {
      setTabs((prev) => (
        [
          ...prev.map((item)=>({
            ...item,
            value: item.type === "all" ? filteredData.length : typesSizes[item.type as SearchDataTypes] ?? 0,
          })),
          {...tab,[tab.name]:typesSizes[tab.type as SearchDataTypes] ?? 0}
        ]
      ));
    }
  };

  const getTypesSize = ()=>{
     const typeSizes = filteredData.reduce((acc, curr) => {
    acc[curr.type] = (acc[curr.type] ?? 0) + 1;
    return acc;
  }, {} as Record<SearchDataTypes, number>);

    return typeSizes;
  }

  const handleUpdateTabsData = ()=>{
    const typesSizes = getTypesSize();
    setTabs((prev)=>(
      prev.map((item)=>({
        ...item,
         value: item.type === "all" ? filteredData.length : typesSizes[item.type as SearchDataTypes] ?? 0,
      }))
    ))

  }


  useEffect(()=>{
       handleUpdateTabsData();
  },[filteredData])



  return (
    <div className="px-3 pt-2 flex items-start justify-between border-[3px] border-t-0 border-b-primary-20">
      <div className="flex items-center gap-4 px-2  hide-scrollbar ">
        <AnimatePresence>
        {tabs?.map((item, index) => (
          <motion.button
          initial={{opacity:0}}
          animate={{opacity:1}}
          exit={{opacity:0,transition:{duration:0.3}}}
          transition={{duration:0.3}}
            onClick={() => setActiveTab(item.type)}
            className={clsx(
              " pb-2 relative flex gap-1 items-center justify-center  cursor-pointer border-3 px-1 after:content-[''] after:absolute after:w-full after:h-[0px] after:bg-black after:bottom-[-3px]",
              activeTab === item.type && "after:h-[2px] "
            )}
            key={index}
          >
            {item.icon && (
              <item.icon
                className={clsx(
                  " w-[18px]",
                  activeTab === item.type ? "text-black" : "text-primary-50"
                )}
              />
            )}
            <p
              className={clsx(
                "font-medium",
                activeTab === item.type ? "text-black" : "text-primary-50"
              )}
            >
              {item.name}
            </p>
            <p className="text-[12px] text-primary-300 bg-primary-20 px-[5px] rounded-sm ml-[4px]">
              <AnimateNumber value={item.value}/>
            </p>
          </motion.button>

))}
</AnimatePresence>
      </div>
      <div className=" relative">
        <Settings
          className={clsx("text-primary-50 w-[25px] cursor-pointer transition-all duration-300",isActiveSettings && "rotate-60 ")}
          onClick={() => setIsActiveSettings(!isActiveSettings)}

        />
        <AnimatePresence>
          {isActiveSettings && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ 
                  height: 0,
                  opacity: 0,
                  transition: { duration: 0.25, ease: "easeIn" }
              }}
              transition={{ duration: 0.15, ease: "linear" }}
              style={{ transformOrigin: "top" }}
              className="absolute -right-1 top-11 bg-white p-2 rounded-lg shadow-secondary border-1 border-primary-20 overflow-hidden z-50"
            >
              {dummyTabs?.map((item, index) => {
                const isActiveTab = Object.values(tabs).some(
                  (tab) => item.name === tab.name
                );
                return (
                  <motion.div
                   initial={{opacity:0}}
                   animate={{opacity:1}}
                   transition={{delay:0.1}}
                   exit={{
                    opacity:0,
                   }}
                   className="h-8 flex shrink-0 items-center justify-between p-1 w-[150px] cursor-pointer hover:bg-primary-20 rounded-sm"
                    key={index}
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <item.icon
                        className={clsx(
                          "w-[20px]",
                          isActiveTab ? "text-primary-100" : "text-primary-30"
                        )}
                      />
                      <p
                        className={clsx(
                          " font-medium overflow-hidden  whitespace-nowrap text-ellipsis ",
                          isActiveTab ? "text-black" : "text-primary-50"
                        )}
                      >
                        {item.name}
                      </p>
                    </div>
                    <RadioBtn
                      isActive={isActiveTab}
                      onClick={() => handleUpdateTab(item, isActiveTab)}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchTabs;
 