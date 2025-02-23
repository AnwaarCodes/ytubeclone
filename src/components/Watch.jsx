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
import { IoIosNotificationsOutline } from "react-icons/io";

const Watch = () => {
    const [input, setInput] = useState("");
    const [singleVideo, setSingleVideo] = useState(null);
    const [suggestedVideos, setSuggestedVideos] = useState([]);
    const [youtubeIcon, setYouTubeIcon] = useState('');
    const [subscriberCount, setSubscriberCount] = useState(null);
    const [subscribe, setSubscribed] = useState(null);
    const [subscribed, setIsSubscribed] = useState(false);
    const [message, setMessage] = useState("");

    const [likeCount, setLikeCount] = useState(null);
    const [dislikeCount, setDislikeCount] = useState(0);
    const [searchParams] = useSearchParams();
    const videoId = searchParams.get('v');
    const dispatch = useDispatch();

    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [showShareOptions, setShowShareOptions] = useState(false);
    const [showResolutions, setShowResolutions] = useState(false);
    const [showReportReasons, setShowReportReasons] = useState(false);
    const [copied, setCopied] = useState(false);
    
    const handleLike = () => {
        setLiked(prevCount => (liked ? prevCount + 1 : prevCount - 1));
        // setLiked(liked + 1)
        if (dislikeCount) setDislikeCount(false);
    };

    const handleDislike = () => {
        setDisliked(!disliked);
        if (liked) setLiked(false);
      };

    // const handleDislikeCount = () => {
    //     setDislikeCount(!dislikeCount + 1);
    //     setDisliked(!disliked);
    //     if (liked) setLiked(false);
    //   };
    const handleDislikeCount = () => {
        setDislikeCount(prevCount => (disliked ? prevCount - 1 : prevCount + 1));
        setDisliked(!disliked);
      
        // if (liked) { setLiked(false); }
      };

    const handleShare = () => {
        navigator.clipboard.writeText("https://example.com/video-link");
        alert("Video link copied to clipboard!");
    };

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
                setSubscribed(formatSubscriberCount(parseInt(channelData?.statistics?.subscriberCount))); 
                setLikeCount(formatSubscriberCount(parseInt(singleVideo?.statistics?.likeCount)));
            }
        } catch (error) {
            console.error("Error fetching channel data:", error);
        }
    };

    const handleSubscriberCount = ()=> {
        // setSubscribed(prevCount => (subscribe ? prevCount + 1 : prevCount) )
        if (subscribed) {
            setSubscribed(prev => prev - 1);
            setMessage("Unsubscribed!");
          } else {
            setSubscribed(prev => prev + 1);
            setMessage("Subscribed! Subscriber count increased by +1");
          }
          setIsSubscribed(!subscribed);
          setTimeout(() => setMessage(""), 4000);
    }


    const getSuggestedVideos = async () => {
        try {
            const channelResponse = await axios.get(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${singleVideo.snippet.channelId}&maxResults=10&order=date&type=video&key=${API_KEY}
`
              );
                 const channelData = channelResponse?.data?.items[0];
                setYouTubeIcon(channelData?.snippet?.thumbnails?.high?.url)
                setSuggestedVideos(channelResponse?.data?.items || []); 
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

    const copyLink = async () => {
        try {
          await navigator.clipboard.writeText("https://yourvideo.com/share-link");
          setCopied(true); // Show "Copied!" message
      
          // Hide the message after 2 seconds
          setTimeout(() => setCopied(false), 2000);
        } catch (error) {
          console.error("Failed to copy the link:", error);
        }
      };
      


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
                    <div className="flex items-center justify-start mt-4">
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
                       
                        <button onClick = {handleSubscriberCount} className="px-5 py-[7px] font-medium font-Roboto bg-white  flex justify-between items-center gap-2 text-black rounded-full ml-40 mr-2">
                        {subscribed && <IoIosNotificationsOutline />}
                           {subscribed ? "Subscribed 👌" : "Subscribe 😒"}
                        </button>
                       {message && <div className="notification absolute top-[10%] left-0 bg-gray-800 p-2">{message}</div>}

                    </div>

                    {/* Buttons Section */}
                    <div className="flex items-center flex-wrap justify-start mt-6 gap-5">

                        {/* Like Button */}
                     <div
                            className="flex items-center cursor-pointer bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-all duration-200"
                            onClick={handleLike}
                        >
                            <AiOutlineLike
                                size="18px"
                                className={`mr-2 ${liked ? "text-blue-500 animate-bounce" : "text-white"}`}
                            />
                            <span className="text-sm text-gray-100">
                              {likeCount ? `${likeCount} likes` : "Loading..."}
                            </span>
                        </div>


                       {/* Dislike Button */}
                       <div
                            className="flex items-center cursor-pointer bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-all duration-200"
                            onClick={handleDislikeCount}
                        >
                            <AiOutlineDislike
                                size="18px"
                                className={`mr-2 ${disliked ? "text-red-500 animate-bounce" : "text-white"}`}
                            />
                            <span onClick={handleDislike} style={{ cursor: 'pointer' }}>
                            {dislikeCount ? `${dislikeCount}` : `${dislikeCount}`}
                           </span>
                        </div>

                        {/* Share Button with Copy Link */}
                        <div
                            className="relative flex items-center cursor-pointer bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600"
                            onClick={() => setShowShareOptions(!showShareOptions)}
                        >
                            <PiShareFatLight size="18px" className="mr-2" />
                            <span>Share</span>
                            {showShareOptions && (
                                <div className="absolute top-10 -left-10 bg-gray-800 text-white rounded shadow-lg p-4 w-[360px]">
                                    <p className="mb-2">Copy this link:</p>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            className="bg-gray-700 text-white p-2 rounded w-full"
                                            value="https://yourvideo.com/share-link"
                                            readOnly
                                        />
                                        <button
                                            className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-500"
                                            onClick={() => copyLink(!copied)}
                                        >
                                            Copy
                                        </button>
                                    </div>
                                    {copied && <p className="text-green-400 mt-2">Copied!</p>}
                                </div>
                            )}
                        </div>

                        {/* Download Button */}
                        <div
                            className="relative flex items-center cursor-pointer bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600"
                            onClick={() => setShowResolutions(!showResolutions)}
                        >
                            <GoDownload size="18px" className="mr-2" />
                            <span>Download</span>
                            {showResolutions && (
                                <div className="absolute top-10 left-0 bg-gray-800 text-white rounded shadow-lg p-2">
                                    <p className="hover:bg-gray-700 p-2 cursor-pointer">1080p</p>
                                    <p className="hover:bg-gray-700 p-2 cursor-pointer">720p</p>
                                    <p className="hover:bg-gray-700 p-2 cursor-pointer">480p</p>
                                    <p className="hover:bg-gray-700 p-2 cursor-pointer">360p</p>
                                </div>
                            )}
                        </div>

                        {/* Report Button with More Conditions */}
                        <div
                            className="relative flex items-center cursor-pointer bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600"
                            onClick={() => setShowReportReasons(!showReportReasons)}
                        >
                            <span>Report</span>
                            {showReportReasons && (
                                <div className="absolute -top-40 -left-40 bg-gray-800 text-white rounded shadow-lg p-4 w-48 h-auto ">
                                    <p className="hover:bg-gray-700 p-2 cursor-pointer">Spam</p>
                                    <p className="hover:bg-gray-700 p-2 cursor-pointer">Harassment</p>
                                    <p className="hover:bg-gray-700 p-2 cursor-pointer">Misinformation</p>
                                    <p className="hover:bg-gray-700 p-2 cursor-pointer">Hate Speech</p>
                                    <p className="hover:bg-gray-700 p-2 cursor-pointer">Graphic Content</p>
                                    <p className="hover:bg-gray-700 p-2 cursor-pointer">Other</p>
                                </div>
                            )}
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