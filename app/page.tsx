'use client';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { FormEvent, Fragment, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const ytVidIdRegexp = /youtu(?:.*\/v\/|.*v\=|\.be\/)([A-Za-z0-9_\-]{11})/;
  const [checked, setChecked] = useState(false);
  const [submitted, setShowSubmitted] = useState(false);
  const [vidInput, setVidInput] = useState('');
  const [timeInput, setTimeInput] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const videoId = formData
      .get('videoUrl')
      ?.toString()
      .match(ytVidIdRegexp)?.[1];

    if (!videoId) {
      alert('Invalid YouTube video URL');
      return;
    }

    const response = await fetch('/api/submit', {
      method: 'POST',
      body: formData
    });

    // Handle response if necessary
    // const data = await response.json()
    // ...
    setShowSubmitted(true);
  }

  function handleSwitchClick() {
    setChecked(!checked);
  }

  return (
    <Fragment>
      <main className="flex items-center justify-center h-screen bg-[#faf0e6]">
        <div className="wrapper container max-w-3xl px-4 md:px-0">
          <div className="space-y-6 text-center flip-card__front">
            <div className="group relative flex justify-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Troll URL generator
              </h1>
              <span className="absolute bottom-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
                ✨ Rick roll someone or make them sit through whatever you want
                before redirecting them to the real URL.
              </span>
            </div>

            <div className="flex justify-center items-center">
              <label className="flex relative switch2">
                <input
                  name="switch"
                  id="switch"
                  className="toggle switch"
                  type="checkbox"
                  value="private"
                  onClick={handleSwitchClick}
                />

                <label htmlFor="switch">
                  <span className="switch-x-toggletext">
                    <span className="switch-x-checked text-gray-700">
                      Custom
                    </span>

                    <Image
                      className="switch-x-unchecked border-black border"
                      src="/rick-roll-removebg-preview.jpg"
                      alt="Rick Roll"
                      width={30}
                      height={30}
                    />
                  </span>
                </label>

                <span className="slider"></span>
              </label>
            </div>

            <form className="space-y-4 flip-card__form" onSubmit={handleSubmit}>
              <div
                className={
                  'flex justify-center space-x-2 ' + (checked ? '' : 'hidden')
                }
              >
                <Input
                  name="videoUrl"
                  id="videoUrl"
                  className="flex-1 flip-card__input"
                  type="text"
                  placeholder="Enter Custom Video URL"
                  value={
                    checked
                      ? vidInput
                      : 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                  }
                  onChange={(e) => setVidInput(e.target.value)}
                  defaultValue="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                />
                <Input
                  name="waitTimeInSecs"
                  id="waitTimeInSecs"
                  className="flex-1 flip-card__input"
                  type="number"
                  placeholder="Enter Wait Time (seconds)"
                  value={checked ? timeInput : '30'}
                  onChange={(e) => setTimeInput(e.target.value)}
                  defaultValue={30}
                />
              </div>

              <div className="flex space-x-2 w-full mx-auto">
                <Input
                  name="url"
                  id="url"
                  required
                  className="flex-1 flip-card__input"
                  placeholder="Enter your URL"
                  type="url"
                />
                <button className="flip-card__btn" type="submit">
                  Generate!
                </button>
              </div>
            </form>

            {submitted && (
              <>
                <p> Here is your new URL: </p>
                <div className="">
                  <p>
                    👁 Remember! If your URL isn&apos;t used in 20 days
                    <Image
                      className="mx-1 inline-block border border-black"
                      src="/rick-smiling-removebg-preview.jpg"
                      alt="Rick Roll"
                      width={35}
                      height={25}
                    />
                    will personally get into the database and delete it
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 z-50 w-screen">
        <div className="flex flex-wrap justify-between bg-[#faf0e6] px-4 py-4 md:px-6">
          <div className="flex items-center">
            <span className="text-sm text-gray-500">made with ♥ by</span>
            <Link
              className="space-x-2 ml-2"
              href="https://github.com/andresestrella"
              prefetch={false}
            >
              <GithubIcon className="h-5 w-5" />
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              Made you smile? consider
            </span>
            <Link
              className="inline-flex items-center space-x-2 bg-gray-900 text-gray-50 rounded-md px-3 py-2 text-sm font-medium shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
              href="https://buymeacoffee.com/andrese"
              prefetch={false}
            >
              <CoffeeIcon className="h-5 w-5" />
              <span>Buying me a coffee</span>
            </Link>
          </div>
        </div>
      </footer>
    </Fragment>
  );
}

function CoffeeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 2v2" />
      <path d="M14 2v2" />
      <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />
      <path d="M6 2v2" />
    </svg>
  );
}

function GithubIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}
