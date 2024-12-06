import React, { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import API_KEY from '../constant/youtube';
import axios from "axios";
import Avatar from "react-avatar";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { PiShareFatLight } from "react-icons/pi";
import { GoDownload } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuSendHorizonal } from "react-icons/lu";
import LiveChat from './LiveChat';
import { useDispatch } from "react-redux";
import { setMessage } from "../utils/chatSlice";
import SuggestionVideoCard from './SuggestionVideoCard';
import { useLocation } from 'react-router-dom';

const Watch = () => {
    const [input, setInput] = useState("");
    const [singleVideo, setSingleVideo] = useState(null);
    const [suggestedVideos, setSuggestedVideos] = useState([]);
    const [youtubeIcon, setYouTubeIcon] = useState("");
    const [subscriberCount, setSubscriberCount] = useState(null);
    const [searchParams] = useSearchParams();
    const videoId = searchParams.get('v');
    const dispatch = useDispatch();

    const { state } = useLocation(); // to get state of item
    const item = state?.item



    const getSingleVideo = async () => {
        try {
            const res = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`);
            setSingleVideo(res?.data?.items[0]);
        } catch (error) {
            console.log(error);
        }
    }

    const formatSubscriberCount = (count) => {
        if (count >= 1000000000) {
            return (count / 1000000000).toFixed(1) + 'B';
        } else if (count >= 1000000) {
            return (count / 1000000).toFixed(1) + 'M';
        } else if (count >= 1000) {
            return (count / 1000).toFixed(1) + 'K';
        } else {
            return count.toString();
        }
    };

    const getChannelData = async () => {
        try {
            if (singleVideo?.snippet?.channelId) {
                const res = await axios.get(
                    `https://www.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&id=${singleVideo.snippet.channelId}&key=${API_KEY}`
                );
                const channelData = res?.data?.items[0];
                setYouTubeIcon(channelData?.snippet?.thumbnails?.high?.url);
                setSubscriberCount(formatSubscriberCount(parseInt(channelData?.statistics?.subscriberCount)));
            }
        } catch (error) {
            console.error("Error fetching channel data:", error);
        }
    };

    const getSuggestedVideos = async () => {
        try {
            const res = await axios.get(
                // `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${item.snippet.channelId}&key=${API_KEY}`
                `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${videoId}&type=video&key=${API_KEY}`)
                setYouTubeIcon(res?.data?.items[0]?.snippet?.thumbnails?.standard?.url)
                setSuggestedVideos(res?.data?.items || []);
        } catch (error) {
            console.error("Error fetching suggested videos:", error);
        }
    };


    // useEffect(() => {
    //     getSingleVideo();
    //     getSuggestedVideos();
    // }, [videoId]);

    // const sendMessage = () => {
    //     dispatch(setMessage({ name: "Patel", message: input }));
    //     setInput("");
    // }

    // useEffect(() => {
    //     getSingleVideo();
    // }, []);
    const sendMessage = () => {
        dispatch(setMessage({ name: "Patel", message: input }));
        setInput("");
    };

    useEffect(() => {
        getSingleVideo();
    }, [videoId]);

    useEffect(() => {
        if (singleVideo) {
            getChannelData();
            getSuggestedVideos();
        }
    }, [singleVideo]);


    return (
        <div className="flex flex-col lg:flex-row w-full mt-4 px-4 lg:px-10">
        {/* Video and Chat Section */}
        <div className="flex flex-col w-full lg:w-[60%]">
            {/* Video Section */}
            <div className="w-full">
                {/* Video Player */}
                <iframe
                    className="w-full h-[300px] lg:h-[400px] rounded-xl"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=0`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>

                {/* Video Title */}
                <h1 className="font-bold mt-4 text-xl lg:text-[22px] text-white">
                    {singleVideo?.snippet?.title}
                </h1>

                {/* Channel and Button Section */}
                <div className="flex items-center justify-between mt-4">
                    {/* Channel Info */}
                    <div className="flex items-center justify-center">
                        <Avatar
                            src={youtubeIcon}
                            size={40}
                            round={true}
                        />
                        <div className="ml-3 text-white flex justify-center items-center gap-4">
                            <h1 className="font-bold">{singleVideo?.snippet?.channelTitle}</h1>
                            <span className="text-sm text-gray-400">
                                    {subscriberCount ? `${subscriberCount} subscribers` : "Loading..."}
                            </span>
                        </div>
                    </div>
                    <button className="px-5 py-[7px] font-medium font-Roboto bg-red-500 text-white rounded-full hover:bg-red-700 mr-2">
                        Subscribe
                    </button>
                </div>

                {/* Buttons Section */}
                <div className="flex items-center flex-wrap justify-between mt-6 gap-1">
                    <div className="flex items-center cursor-pointer bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600">
                        <AiOutlineLike size="18px" className="mr-2" />
                        <span>Like</span>
                        <AiOutlineDislike size="18px" className="ml-4" />
                    </div>
                    <div className="flex items-center cursor-pointer bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600">
                        <PiShareFatLight size="18px" className="mr-2" />
                        <span>Share</span>
                    </div>
                    <div className="flex items-center cursor-pointer bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600">
                        <GoDownload size="18px" className="mr-2" />
                        <span>Download</span>
                    </div>
                    <div className="flex items-center cursor-pointer bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600">
                        <span>Remix</span>
                    </div>
                    <div className="flex items-center cursor-pointer bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600">
                        <span>Clip</span>
                    </div>
                    <div className="flex items-center cursor-pointer bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600">
                        <span>Save</span>
                    </div>
                    <div className="flex items-center cursor-pointer bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600">
                        <span>Report</span>
                    </div>
                </div>
            </div>

            {/* Chat Section */}
            <div className="w-full lg:w-[80%] border border-gray-700 rounded-lg bg-gray-900 p-4 mt-6">
                <div className="flex justify-between items-center text-white mb-4">
                    <h1 className="font-bold text-lg">Top Chat</h1>
                    <BsThreeDotsVertical />
                </div>
                <div className="overflow-y-auto h-[28rem] pt-2 flex flex-col-reverse w-full">
                    <LiveChat />
                </div>
                <div className="flex items-center justify-between border-t border-gray-700 pt-4 mt-4">
                    <div className="flex items-center w-full">
                        <Avatar
                            src={youtubeIcon}
                            size={35}
                            round={true}
                        />
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="bg-gray-800 text-white border-b border-gray-700 outline-none ml-3 w-full p-2"
                            type="text"
                            placeholder="Send a message..."
                        />
                        <div className="bg-gray-700 cursor-pointer p-2 rounded-full hover:bg-gray-600">
                            <LuSendHorizonal onClick={sendMessage} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Suggested Videos Section */}
        <div className="w-full lg:w-[35%] lg:ml-6 mt-6 lg:mt-0">
            {suggestedVideos.map((video, index) => (
                <SuggestionVideoCard
                    key={video.id?.videoId || video.id || index}
                    item={video}
                    duration={video.contentDetails?.duration}
                    youtubeIcon={youtubeIcon}
                />
            ))}
        </div>
    </div>
    )
}


export default Watch;