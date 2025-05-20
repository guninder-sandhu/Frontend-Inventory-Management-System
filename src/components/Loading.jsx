import {MoonLoader} from "react-spinners";

export const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <MoonLoader size={50} loading={true}
                        color={document.documentElement.classList.contains('dark') ? '#ffffff' : '#162456'}/>
        </div>
    );
}