import React from "react";
import InputForm from "../InputForm";

export interface HomeProps {
    onScrape: (urls: string[]) => Promise<void>;
}

const Home: React.FC<HomeProps> = ({ onScrape }): React.JSX.Element => {

    return (
        <section className="relative z-0 flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
            <img src="/src/assets/beams.jpg" alt="" className="-z-3 absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" width="1308" />
            <div className="-z-2 absolute inset-0 bg-[url(/src/assets/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

            <div className="absolute -right-44 -top-44 p-20">
                <div className="block h-72 w-72 rounded-[30%/60%_60%_30%_40%] bg-white bg-gradient-to-r from-gray-50 to-gray-300 opacity-50 drop-shadow-[0px_5px_3px_rgba(0,0,0,0.25)]"></div>
            </div>
            <div className="absolute -bottom-24 -left-24 p-20">
                <div className="block h-40 w-40 rounded-[50%_80%_50%20%] bg-white bg-gradient-to-r from-gray-50 to-gray-300 opacity-50 drop-shadow-[2px_-2px_3px_rgba(0,0,0,0.25)]"></div>
            </div>
            <div className="z-0">
                <h1 className="p-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block">
                        Extract web data
                        <span className="bg-gradient-to-tr from-blue-600 to-cyan-500 bg-clip-text text-transparent"> the easy way </span>
                    </span>
                </h1>
                <InputForm onSearch={onScrape} />
            </div>
        </section>
    )
}

export default Home;