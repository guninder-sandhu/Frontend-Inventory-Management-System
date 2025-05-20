import {useAuth0} from "@auth0/auth0-react";

export const Login = () => {
    const { loginWithRedirect} = useAuth0();
    return (
        <>
            <button onClick={() => loginWithRedirect()}
                    className="bg-violet-800 hover:bg-violet-900 text-white font-bold py-2 px-4 rounded">
                Login/SignUp
            </button>

        </>
    );

}