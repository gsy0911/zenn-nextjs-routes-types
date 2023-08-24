import Image from "next/image";
import { Inter } from "next/font/google";
import { request, useAppSWR } from "@/lib/api/hooks";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // const { data, mutate: reFetch } = useAppSWR({
  //   url: "/user",
  //   method: "GET",
  //   params: { id: "any" },
  //   paths: {}
  // });
  const { data, mutate: reFetch } = useAppSWR({
    url: "/v1/user/{userId}/balance",
    method: "GET",
    params: { id: "any" },
    paths: { userId: "1" },
  });

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex"></div>
      {process.env.BACKEND_API_ENDPOINT}
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <button
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          rel="noopener noreferrer"
          onClick={() => {
            reFetch().then((res) => {
              console.log(res);
            });
          }}
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            GET /user{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
        </button>

        <button
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          rel="noopener noreferrer"
          onClick={() => {
            request({
              url: "/user",
              method: "POST",
              data: {
                name: "new-name",
              },
              paths: {},
            }).then((res) => console.log(res.data.name));
          }}
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            POST /user{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
        </button>

        <button
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          rel="noopener noreferrer"
          onClick={() => {
            request({
              url: "/user",
              method: "PUT",
              data: {
                id: "any-id-ok",
                name: "new-name",
              },
              paths: {},
            }).then((res) => console.log(res.data.name));
          }}
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            PUT /user{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
        </button>

        <button
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          rel="noopener noreferrer"
          onClick={() => {
            request({
              url: "/user",
              method: "DELETE",
              data: {
                id: "any-id-ok",
              },
              paths: { userId: "hello" },
            }).then((res) => console.log(res.data.name));
          }}
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            DELETE /user{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
        </button>
      </div>
    </main>
  );
}
