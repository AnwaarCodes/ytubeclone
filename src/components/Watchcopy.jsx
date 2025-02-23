import React, { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import Avatar from 'react-avatar';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { PiShareFatLight } from 'react-icons/pi';
import { useDispatch } from 'react-redux';
import { setMessage } from '../utils/chatSlice';
import SuggestionVideoCard from './SuggestionVideoCard';
import API_KEY from '../constant/youtube';

const Watch = () => {
  const [input, setInput] = useState('');
  const [singleVideo, setSingleVideo] = useState(null);
  const [suggestedVideos, setSuggestedVideos] = useState([]);
  const [youtubeIcon, setYouTubeIcon] = useState('');
  const [subscriberCount, setSubscriberCount] = useState('');
  const [likeCount, setLikeCount] = useState('');
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [copied, setCopied] = useState(false);

  const [searchParams] = useSearchParams();
  const videoId = searchParams.get('v');
  const dispatch = useDispatch();
  const { state } = useLocation();
  const item = state?.item;

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const videoResponse = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`
        );
        setSingleVideo(videoResponse?.data?.items[0]);
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    if (videoId) fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        if (singleVideo?.snippet?.channelId) {
          const channelResponse = await axios.get(
            `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${singleVideo.snippet.channelId}&key=${API_KEY}`
          );
          const channelData = channelResponse?.data?.items[0];
          setYouTubeIcon(channelData?.snippet?.thumbnails?.high?.url);
          setSubscriberCount(formatCount(channelData?.statistics?.subscriberCount));
          setLikeCount(formatCount(singleVideo?.statistics?.likeCount));
        }
      } catch (error) {
        console.error('Error fetching channel data:', error);
      }
    };

    const fetchSuggestedVideos = async () => {
      try {
        const suggestedResponse = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&relatedToVideoId=${videoId}&type=video&key=${API_KEY}`
        );
        setSuggestedVideos(suggestedResponse?.data?.items || []);
      } catch (error) {
        console.error('Error fetching suggested videos:', error);
      }
    };

    if (singleVideo) {
      fetchChannelData();
      fetchSuggestedVideos();
    }
  }, [singleVideo, videoId]);

  const formatCount = (count) => {
    if (count >= 1_000_000_000) return (count / 1_000_000_000).toFixed(1) + 'B';
    if (count >= 1_000_000) return (count / 1_000_000).toFixed(1) + 'M';
    if (count >= 1_000) return (count / 1_000).toFixed(1) + 'K';
    return count;
  };

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy the link:', error);
    }
  };

  const sendMessage = () => {
    dispatch(setMessage({ name: 'Patel', message: input }));
    setInput('');
  };

  return (
    <div className="flex flex-col lg:flex-row w-full mt-4 px-4 lg:px-10">
      {/* Video Section */}
      <div className="flex flex-col w-full lg:w-[60%]">
        <iframe
          className="w-full h-[300px] lg:h-[400px] rounded-xl"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <h1 className="font-bold mt-4 text-xl lg:text-[22px] text-white">
          {singleVideo?.snippet?.title}
        </h1>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <Avatar src={youtubeIcon} size={40} round={true} />
            <div className="ml-3 text-white">
              <h1 className="font-bold">{singleVideo?.snippet?.channelTitle}</h1>
              <span className="text-sm text-gray-400">
                {subscriberCount ? `${subscriberCount} subscribers` : 'Loading...'}
              </span>
            </div>
          </div>
          <button className="px-5 py-[7px] bg-red-500 text-white rounded-full hover:bg-red-700">
            Subscribe
          </button>
        </div>
        <div className="flex items-center flex-wrap justify-start mt-6 gap-6">
          <div className="flex items-center cursor-pointer bg-gray-700 px-4 py-2 rounded-full hover:bg-gray-600" onClick={handleLike}>
            <AiOutlineLike className={`mr-2 ${liked ? 'text-blue-500' : 'text-white'}`} />
            <span>{likeCount ? `${likeCount} likes` : 'Loading...'}</span>
          </div>
          <div className="flex items-center cursor-pointer bg-gray-700 px-4 py-2 rounded-full hover:bg-gray-600" onClick={handleDislike}>
            <AiOutlineDislike className={`mr-2 ${disliked ? 'text-red-500' : 'text-white'}`} />
            <span>Dislike</span>
          </div>
          <div className="relative flex items-center cursor-pointer bg-gray-700 px-4 py-2 rounded-full hover:bg-gray-600" onClick={copyLink}>
            <PiShareFatLight className="mr-2" />
            <span>Share</span>
            {copied && <p className="absolute top-10 left-0 text-green-400">Copied!</p>}
          </div>
        </div>
      </div>
      {/* Suggested Videos Section */}
      <div className="w-full lg:w-[40%] mt-6 lg:mt-0 lg:pl-10">
        {suggestedVideos.map((video) => (
          <SuggestionVideoCard key={video.id.videoId} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Watch;
