import React from 'react';
import { CiHome } from "react-icons/ci";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import {useSelector} from "react-redux";

const sidebarItem = [
    {
        icons: <CiHome size="24px" />,
        title: "Home"
    },
    {
        icons: <SiYoutubeshorts size="24px" />,
        title: "Shorts"
    },
    {
        icons: <MdOutlineSubscriptions size="24px" />,
        title: "Subscription"
    },
    {
        icons: <CiHome size="24px" />,
        title: "Trending"
    },
    {
        icons: <SiYoutubeshorts size="24px" />,
        title: "Movies"
    },
    {
        icons: <MdOutlineSubscriptions size="24px" />,
        title: "Gaming"
    },
    {
        icons: <CiHome size="24px" />,
        title: "Entertainment"
    },
    {
        icons: <SiYoutubeshorts size="24px" />,
        title: "News"
    },
    {
        icons: <MdOutlineSubscriptions size="24px" />,
        title: "Life"
    },
    {
        icons: <CiHome size="24px" />,
        title: "Vlogs"
    },
    {
        icons: <SiYoutubeshorts size="24px" />,
        title: "Live"
    },
    {
        icons: <MdOutlineSubscriptions size="24px" />,
        title: "Coders"
    },
    {
        icons: <CiHome size="24px" />,
        title: "Blogs"
    },
    {
        icons: <SiYoutubeshorts size="24px" />,
        title: "Privacy & Policy"
    },
    {
        icons: <SiYoutubeshorts size="24px" />,
        title: "Account Info"
    },
]

const Sidebar = () => { 
    const open = useSelector((store)=>store.app.open);
     
    return (
        <div className={`relative left-0 ${open? "w-[20%]" : "w-[6%]"} p-5 h-[calc(100vh-4.625rem)] bg-white overflow-y-scroll overflow-x-hidden`}>
            {
                sidebarItem.map((item, index) => {
                    return (
                        <div key={index} className='flex my-3 ml-2'>
                            {item.icons}
                            <p className={`ml-5 ${open ? "": 'hidden'}`}>{item.title}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Sidebar