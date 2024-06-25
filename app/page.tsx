"use server"
import { createRedirect, RedirectProps } from '@/lib/api/redirect';
import Link from 'next/link';
import { Fragment } from 'react';
import MainForm from './mainForm';


export async function handleSubmit(formData: FormData) {
  "use server"

  const rawFormData: RedirectProps = {
    url: formData.get('url')!.toString(),
    seconds: Number(formData.get('seconds')!),
    videoUrl: formData.get('videoUrl')!.toString(),
    lastVisit: new Date(),
    code: undefined,
  }

  const redirect = await createRedirect(rawFormData);

  if (!redirect) {
    alert('Failed to create redirect');
    return null;
  }

  return redirect;
}

export async function Home() {
  return (
    <Fragment>
      <main className="flex items-center justify-center h-screen bg-[#faf0e6]">
        <div className="wrapper container px-4 md:px-0">
          <MainForm></MainForm>
        </div>
      </main>

      <footer className="fixed bottom-0 w-screen">
        <div className="flex flex-wrap justify-between bg-[#faf0e6] px-4 py-4">
          <div className="flex justify-center items-center">
            <span className="text-sm text-gray-500">made with ♥ by</span>
            <Link
              className="space-x-2 ml-2"
              href="https://github.com/andresestrella"
              prefetch={false}
            >
              <GithubIcon className="h-5 w-5" />
            </Link>
          </div>

          <div className="flex flex-col items-center space-x-2">
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

export default Home;
