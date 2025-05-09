import React from "react";
import {Link, redirect} from "react-router";
import {ButtonComponent} from "@syncfusion/ej2-react-buttons";
import {account} from "~/appwrite/client";
import {loginWithGoogle} from "~/appwrite/auth";

export async function clientLoader() {
    try {
        const user = await account.get();
        if (user.$id) return redirect("/");
    } catch (error) {
        console.log("Error fetching user data", error);
    }
}

const SignIn = () => {
    return (
        <main className="auth">
            <section className="flex-center glassmorphism size-full px-6">
                <div className="sign-in-card">
                    <header className="header">
                        <Link to="/">
                            <img
                                src="/assets/icons/logo.svg"
                                alt="logo"
                                className="size-[30px]"
                            />
                        </Link>
                        <h1 className="p-28-bold text-dark-200">Tourvisto</h1>
                    </header>
                    <article>
                        <h1 className="p-28-semibold text-dark-200 text-center">
                            Admin Dashboard Login
                        </h1>
                        <p className="p-18-regular text-gray-100 text-center !leading-7">
                            Sign in with Google to manage destinations, itineraries, and user
                            activity with ease.
                        </p>
                    </article>
                    <ButtonComponent
                        type="button"
                        iconCss="e-search-button"
                        className="button-class !h-11 !w-full"
                        onClick={loginWithGoogle}
                    >
                        <img
                            src="/assets/icons/google.svg"
                            alt="google"
                            className="size-5"
                        />
                        <span className="p-18-semibold text-white">
              Sign in with google
            </span>
                    </ButtonComponent>
                </div>
            </section>
        </main>
    );
};
export default SignIn;
