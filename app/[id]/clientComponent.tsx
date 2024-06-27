'use client';
import { RedirectProps } from '@/lib/api/redirect';
import { getVideoId } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
// import YouTube, { YouTubeProps, YouTubePlayer } from 'react-youtube';

// async function loadScript(src: string) {
//   return new Promise<void>((resolve, reject) => {
//     const script = document.createElement('script');
//     script.src = src;
//     script.onload = resolve;
//     script.onerror = reject;
//     document.body.appendChild(script);
//   });
// }

export default function ClientComponent(props: { redirect: RedirectProps }) {
  const redirect = props.redirect;
  const msg = redirect.videoUrl.includes('dQw4w9WgXcQ') ? 'You got Rick Rolled XD' : 'You got trolled XD';
  const [countdown, setCountdown] = useState<number>(Number(redirect.seconds));
  const [countdownStarted, setCountdownStarted] = useState(false);

  const [isRevealed, setIsRevealed] = useState(false);
  const [doneLoading, setDoneLoading] = useState(false);

  var player: any;
  const playerRef = useRef<any>(null);

  // let videoElement: any = null;
  // const onPlayerReady: YouTubeProps['onReady'] = (event) => {
  //   // access to player in all event handlers via event.target
  //   videoElement = event;
  // };

  // const opts: YouTubeProps['opts'] = {
  //   height: '390',
  //   width: '640',
  //   playerVars: {
  //     // https://developers.google.com/youtube/player_parameters
  //     autoplay: 0
  //   }
  // };

  const loadYoutube = (callback: any) => {
    if (!(window as any).YT) {
      var tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      var firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag.parentNode != null) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
      tag.onload = callback;
    } else {
      callback();
    }
  };

  function loadVideo() {
    // 3. This function creates an <iframe> (and YouTube player) after the API code downloads.
    player = new (window as any).YT.Player('player', {
      height: window.innerHeight / 1.5,
      width: window.innerWidth / 1.5,
      videoId: getVideoId(redirect.videoUrl),
      mute: 1,
      playerVars: {
        playsinline: 1,
        'controls': 0
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: (event: any) => {
          if (event.data === 2) {
            alert("That won't help you lol");
            playerRef.current.playVideo();
          }
        }
      }
    });

    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event: any) {
      setDoneLoading(true);
      playerRef.current = event.target;
    }
  }

  useEffect(() => {
    loadYoutube(loadVideo);
  }, [redirect.videoUrl]);

  const handleClick = () => {
    setIsRevealed(true);
    playerRef.current.playVideo();
    // playerRef.current.setVolume(100);
    setTimeout(() => {
      setCountdownStarted(true);
    }, 3000);
  };

  useEffect(() => {
    if (countdownStarted) {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [countdownStarted]);

  useEffect(() => {
    if (playerRef.current && countdownStarted && countdown >= 0) {
      playerRef.current.setVolume(100);
    }
    if (countdown <= 0) {
      window.location.href = redirect.url;
    }
  }, [countdown]);

  return (
    <>
      {
        //Cloudflare captcha widget
        // <div
        //   className="cf-turnstile"
        //   data-sitekey="0x4AAAAAAAcAPnoVsvl7NBaD"
        //   data-callback="javascriptCallback"
        // ></div>
      }

      {
        // react-youtube component
        // <YouTube videoId="dQw4w9WgXcQ" opts={opts} onReady={onPlayerReady} />
      }

      <div className="colored-background flex flex-col justify-center items-center align-middle z-0 bg-[#faf0e6] h-screen w-screen">
        <div className="cursor-default">
          <h1 className="text-center mb-8 text-xl font-bold md:text-4xl">
            {msg}
          </h1>

          <div id="player" className=""></div>

          {countdownStarted && (
            <h1 className="absolute font-bold left-0 right-0 text-center mt-6 text-base md:text-xl mx-2">
              Just kidding! You will be redirected in {countdown}
            </h1>
          )}
        </div>

        <Link
          className="absolute bottom-0 right-0 text-blue-700 font-bold mr-5"
          href="/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Make your own
        </Link>
      </div>

      {!isRevealed && (
        <div className="cursor-default z-5 absolute top-0 left-0">
          <div className="bg-[#faf0e6] opacity-100 w-screen h-screen"></div>
          {doneLoading && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <p className="text-black text-center">
                Verify you are human to access
              </p>
              <Image
                src="/cropped-cloudflare-widget.jpg"
                alt="cloudflare captcha widget"
                className="cursor-pointer min-w-[303px] min-h-[65px]"
                width={303}
                height={65}
                onClick={handleClick}
              ></Image>
            </div>
          )}
        </div>
      )}
    </>
  );
}
