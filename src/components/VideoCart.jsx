import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Avatar from "react-avatar";
import API_KEY from '../constant/youtube';


const VideoCart = ({ item, duration }) => {
    const [ytIcon, setYtIcon] = useState("");
    const getYoutubeChannelName = async () => {
        try {
            const res = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${item.snippet.channelId}&key=${API_KEY}`)
            setYtIcon(res?.data?.items[0]?.snippet?.thumbnails?.high?.url);
            console.log(res?.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getYoutubeChannelName();
    }, [])

    const formatDuration = (isoDuration) => {
        let hours = 0,
            minutes = 0,
            seconds = 0;

        // Match the ISO duration string
        const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

        if (match) {
            hours = parseInt(match[1]) || 0;
            minutes = parseInt(match[2]) || 0;
            seconds = parseInt(match[3]) || 0;
        }

        // Format as hours:minutes:seconds
        return `${hours > 0 ? hours + ':' : ''}${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const formatViews = (views) => {
        if (views >= 1000000) {
            return (views / 1000000).toFixed(1) + "M";
        } else if (views >= 1000) {
            return (views / 1000).toFixed(1) + "K";
        }
        return views.toString();
    };

    //   const formatPublishedAt = (isoDate) => {
    //     const date = new Date(isoDate);
    //     const options = { year: 'numeric', month: 'long', day: 'numeric' };
    //     return date.toLocaleDateString('en-US', options);
    //   };

    const formatPublishedAt = (dateString) => {
        const now = new Date();
        const publishedDate = new Date(dateString);
        const diffInSeconds = Math.floor((now - publishedDate) / 1000);

        const secondsInMinute = 60;
        const secondsInHour = 3600;
        const secondsInDay = 86400;
        const secondsInWeek = 604800;
        const secondsInMonth = 2592000;
        const secondsInYear = 31536000;

        if (diffInSeconds < secondsInMinute) return `${diffInSeconds}s ago`;
        if (diffInSeconds < secondsInHour)
            return `${Math.floor(diffInSeconds / secondsInMinute)}m ago`;
        if (diffInSeconds < secondsInDay)
            return `${Math.floor(diffInSeconds / secondsInHour)}h ago`;
        if (diffInSeconds < secondsInWeek)
            return `${Math.floor(diffInSeconds / secondsInDay)}d ago`;
        if (diffInSeconds < secondsInMonth)
            return `${Math.floor(diffInSeconds / secondsInWeek)}w ago`;
        if (diffInSeconds < secondsInYear)
            return `${Math.floor(diffInSeconds / secondsInMonth)}mo ago`;
        return `${Math.floor(diffInSeconds / secondsInYear)}y ago`;
    };







    return (
        <div className="w-94 cursor-pointer my-2 relative">
            <img
                className="rounded-xl w-full"
                src={item.snippet.thumbnails.medium.url}
                alt="ytvideo"
            />
            <div className="absolute bottom-[114px] right-2  bg-black bg-opacity-60 text-white text-xs mt-11 px-2 py-1 rounded">
                {formatDuration(duration)}
            </div>
            <div>
                <div className="flex mt-2">
                    <div className="w-[50px] h-[100px] pt-1">
                        <Avatar src={ytIcon} size={35} round={true} />
                    </div>
                    <div className="ml-2">
                        <h1 className="font-roboto font-medium not-italic leading-[19px] pt-1 text-sm sm:text-[13px]">
                            {item.snippet?.title}
                        </h1>
                        <p className="text-sm sm:text-xs text-[#C5C5C5] mt-[5px]">{item.snippet.channelTitle}</p>
                        <div className="flex gap-2 text-sm sm:text-xs text-gray-400 mt-1">
                            <p className='font-roboto font-medium not-italic text-[#C5C5C5]'>{formatViews(item.statistics.viewCount)} views</p>
                            <p className='font-roboto font-medium not-italic text-[#C5C5C5]'>{formatPublishedAt(item.snippet.publishedAt)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}


export default VideoCart;