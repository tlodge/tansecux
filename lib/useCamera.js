import { useEffect, useState, useRef } from 'react';

const useCleanup = (val) => {
    const valRef = useRef(val);

    useEffect(() => {
       valRef.current = val;
    }, [val])

    useEffect(() => {
        return () => {
              // cleanup based on valRef.current
        }
    }, [])
}

const initialiseCamera = async() => await navigator.mediaDevices.getUserMedia({audio: false, video: {facingMode:"environment"}});

export const useCamera = videoRef => {
    const [isCameraInitialised, setIsCameraInitialised] = useState(false);
    const [video, setVideo] = useState(null);
    const [error, setError] = useState('');
    const [playing, setPlaying] = useState(true);

    useEffect(() => {
        if(video || !videoRef.current) {
            return;
        }

        const videoElement = videoRef.current;
        if(videoElement instanceof HTMLVideoElement) {
            setVideo(videoRef.current);
        }
    }, [videoRef, video]);


    useCleanup(video)

    useEffect(() => {
        if(!video || isCameraInitialised || !playing) {
            return;
        }

        initialiseCamera()
            .then(stream => {
                video.srcObject = stream;
                video.setAttribute("playsinline", true);
                setIsCameraInitialised(true);
               
            })
            .catch(e => {
                setError(e.message);
                setPlaying(false);
            });
    }, [video, isCameraInitialised, playing]);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement){
        if(playing) {
            videoElement.play();
        } else {
            videoElement.pause();
        }
    }

    },[playing, videoRef]);
    
    return [video, isCameraInitialised, playing, setPlaying, error];
};