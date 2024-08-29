import LoginForm from "@/components/LoginForm"

const Login = () => {
    return (
        <main>
            <div className="min-h-screen grid grid-cols-9">
                <div className="col-span-4 bg-primary p-10 2xl:pr-20 flex justify-end items-center h-full">
                    <div className="max-w-[500px]">
                        <h2 className="text-white 2xl:text-6xl lg:text-5xl font-bold capitalize leading-[1.13]">Welcome to our community</h2>
                        <p className="text-white/80 mt-4">Clarity gives you the blocks & components you need to create a truly professional website.</p>
                    </div>
                </div>
                <div className="col-span-5 p-10 2xl:pl-20 flex items-center h-full">
                    <div className="max-w-[520px]">
                        <h2 className="2xl:text-6xl lg:text-5xl font-bold capitalize leading-[1.13]">Welcome back!</h2>
                        <p className="text-foreground/80 mt-4">Clarity gives you the blocks and components you need to create a truly professional website.</p>

                        <LoginForm/>
                        
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Login