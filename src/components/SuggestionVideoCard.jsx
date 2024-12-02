import React from "react";
// import { BsFillCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
// import VideoLength from "../shared/videoLength";
import Avatar from "react-avatar";
import { useLocation } from "react-router-dom";

const SuggestionVideoCard = ({ item, duration, youtubeIcon }) => {

    const {ytIcon} = useLocation();
    const yicon = ytIcon

    return (
        <Link
        to={{
          pathname: `/watch`,
          search: `?v=${item?.id?.videoId || item?.id}`,
        }}
        state={{ item }}
      >
        <div className="flex mb-4 gap-3">
          {/* Thumbnail Container */}
          <div className="relative h-24 lg:h-20 xl:h-24 w-40 min-w-[168px] lg:w-32 lg:min-w-[128px] xl:w-40 xl:min-w-[168px] rounded-xl bg-slate-800 overflow-hidden">
            <img
              className="h-full w-full object-cover rounded-xl"
              src={item.snippet?.thumbnails?.medium.url}
              alt="Video Thumbnail"
            />
            {duration && <div className="absolute bottom-1 right-1 bg-black text-white text-xs px-2 py-1 rounded-md">{duration}</div>}
          </div>
      
          {/* Content Container */}
          <div className="flex flex-col justify-between overflow-hidden">
            {/* Video Title */}
            <span className="text-sm lg:text-xs xl:text-sm font-bold text-white line-clamp-2">
              {item.snippet?.title}
            </span>
      
            {/* Channel Info */}
            <div className="flex items-center mt-2">
              <Avatar src={youtubeIcon} size="30" round={true} className="mr-2" />
              <span className="text-[12px] lg:text-[10px] xl:text-[12px] font-semibold text-white/[0.7]">
                {item.snippet?.channelTitle}
              </span>
            </div>
      
            {/* Video Stats */}
            <div className="flex text-[12px] lg:text-[10px] xl:text-[12px] font-semibold text-white/[0.7] mt-1">
              <span>{item.statistics?.viewCount} views</span>
              <span className="mx-2">·</span>
              <span className="truncate">{new Date(item?.snippet?.publishedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </Link>
      
    );
};

export default SuggestionVideoCard;