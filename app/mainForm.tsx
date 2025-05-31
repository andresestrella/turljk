'use client';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useState } from 'react';
import { handleSubmit } from './page';
import { Tooltip } from 'react-tooltip';

export default function MainForm() {
  const [checked, setChecked] = useState(false);
  const [vidInput, setVidInput] = useState('');
  const [timeInput, setTimeInput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState('');
  // const [state, formAction] = useFormState(createRedirect, initialState);
  const [copySuccess, setCopySuccess] = useState('');

  const copyResultToClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopySuccess('Copied!');
    } catch (err) {
      setCopySuccess('Failed to copy!');
    }
  };

  function handleSwitchClick() {
    setChecked(!checked);
  }

  return (
    <div className="space-y-6 text-center flip-card__front">
      <div
        className="group relative flex justify-center"
      >
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Troll URL generator
        </h1>

        <a
          className="ml-2 cursor-pointer"
          data-tooltip-id="my-tooltip"
          data-tooltip-place="top-start"
          data-tooltip-content="
          ✨ Rick roll someone or make them sit through whatever you want before
          redirecting them to the real URL."
        >
          ◕‿‿◕
        </a>

        <Tooltip
          id="my-tooltip"
          className="max-w-60 rounded-full"
          openOnClick
          defaultIsOpen
        />

        {
          // <span className="absolute bottom-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
          //   ✨ Rick roll someone or make them sit through whatever you want before
          //   redirecting them to the real URL.
          // </span>
        }
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
              <span className="switch-x-checked text-gray-700">Custom</span>

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

      <form
        className="space-y-4 flip-card__form"
        action={async (formData: FormData) => {
          const result = await handleSubmit(formData);
          if (result) {
            const baseUrl = window.location.origin;
            setResult(baseUrl + '/' + result); // Added a '/' for proper path
          } else setResult('');
          setIsSubmitted(true);
        }}
      >
        <div
          className={
            'flex flex-wrap items-center justify-center gap-2 ' +
            (checked ? '' : 'hidden')
          }
        >
          <Input
            required
            name="videoUrl"
            id="videoUrl"
            className="flex-1 flip-card__input"
            type="text"
            placeholder="Enter Custom Video URL"
            value={
              checked ? vidInput : 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
            }
            onChange={(e) => setVidInput(e.target.value)}
          />
          <Input
            required
            name="seconds"
            id="seconds"
            className="flex-1 flip-card__input"
            type="number"
            placeholder="Enter Wait Time (seconds)"
            value={checked ? timeInput : '30'}
            onChange={(e) => setTimeInput(e.target.value)}
          />
        </div>

        <div className="flex space-x-2 w-full mx-auto">
          <Input
            required
            name="url"
            id="url"
            className="flex-1 flip-card__input"
            placeholder="Enter your URL"
            type="url"
          />
          <button className="flip-card__btn" type="submit">
            Generate!
          </button>
        </div>
      </form>

      {isSubmitted && (
        <>
          <div className="flex items-center justify-center space-x-4">
            <p> Here is your new URL: {result}</p>
            {copySuccess === 'Copied!' ? (
              <p>Copied!</p>
            ) : (
              <button
                className="flip-card__btn max-w-[60px]"
                onClick={() => copyResultToClipBoard()}
              >
                Copy
              </button>
            )}
          </div>
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
  );
}
