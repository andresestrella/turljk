'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
// import YouTube, { YouTubeProps, YouTubePlayer } from 'react-youtube';

export default function Page({ params }: { params: { id: string } }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [doneLoading, setDoneLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [countdownStarted, setCountdownStarted] = useState(false);
  const [player, setPlayer] = useState<any>();

  // var player: any;
  const loadYoutube = (callback: any) => {
    if (!( window as any ).YT) {
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
    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    setPlayer(
      new (window as any).YT.Player('player', {
        height: '600',
        width: '800',
        videoId: 'dQw4w9WgXcQ',
        mute: 1,
        playerVars: {
          playsinline: 1
        },
        events: {
          onReady: onPlayerReady
        }
      })
    );

    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event: any) {
      setDoneLoading(true);
      setPlayer(event);
    }
  }

  useEffect(() => {
    loadYoutube(loadVideo);
  }, []);

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

  const handleClick = () => {
    setIsRevealed(true);
    player.target.playVideo();
    // videoElement.target.playVideo();
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
    if (countdown <= 0) {
      window.location.href = 'http://localhost:3000';
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

      <div className="bg-[#faf0e6] w-screen h-screen">
        <div className="z-0">
          <Link
            className="fixed text-blue-700 top-0 right-0 font-bold mr-5"
            href="/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Make your own
          </Link>

          {
            // <iframe
            //   width="720"
            //   height="405"
            //   src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0&autoplay=1&rel=0&showinfo=0"
            //   className="cursor-default absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            //   allowFullScreen
            // />
          }
          <div className="cursor-default absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-4xl text-center mb-8 font-bold">
              You just got Rick Rolled XD
            </h1>
            <div id="player"></div>
            {countdownStarted && (
              <p className="text-center mt-8 text-xl">
                Just kidding! You will be redirected in {countdown}
              </p>
            )}
          </div>
        </div>
      </div>

      {!isRevealed && (
        <div className="cursor-default z-5 absolute top-0 left-0">
          <div className="bg-[#faf0e6] opacity-100 w-screen h-screen"></div>
          {doneLoading && (
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
              <p className="text-black text-center">
                Verify you are human to access
              </p>
              <Image
                src="/cropped-cloudflare-widget.jpg"
                alt="cloudflare captcha widget"
                className="cursor-pointer "
                width={303}
                height={65}
                onClick={handleClick}
              ></Image>
            </div>
          )}
        </div>
      )}
      {
        // <iframe
        //   width="925"
        //   height="315"
        //   src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&amp;autoplay=1&amp;controls=0&amp;showinfo=0"
        //   frameBorder="0"
        //   allowFullScreen
        // ></iframe>
      }

      {
        // <div className="relative h-0">
        //   <iframe
        //     width="560"
        //     height="315"
        //     className="l-0 t-0 absolute w-auto h-auto"
        //     src="https://www.youtube-nocookie.com/embed/lJIrF4YjHfQ?si=eLnHO8_Dz6hDN9PH&autoplay=1&amp;controls=0"
        //     title="YouTube video player"
        //     frameBorder="0"
        //     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        //     referrerPolicy="strict-origin-when-cross-origin"
        //     allowFullScreen
        //   ></iframe>
        // </div>
      }
    </>
  );
}
