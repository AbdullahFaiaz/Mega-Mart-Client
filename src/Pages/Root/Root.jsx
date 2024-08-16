import { Outlet } from "react-router-dom";
import Footer from "../Shared/Footer";

import { AuthContext } from "../../Context/ContextComponent";

import { useContext, } from "react";
import NavbarTwo from "../Shared/NavbarTwo";




const Root = () => {
    const { loading } = useContext(AuthContext)

    if (loading) {
        return (
            <>
                <div className="border h-[100vh] flex flex-col items-center justify-center">
                    <span className="size-96 loading loading-bars loading-lg"></span>
                    <div className="text-5xl">Loading...</div>
                </div>

            </>
        )
    }
    return (
        <div>
            <NavbarTwo />
            <div className="min-h-[calc(100vh-300px)]">
                <Outlet></Outlet>
            </div>
            <Footer />
        </div>
    );
};

export default Root;

