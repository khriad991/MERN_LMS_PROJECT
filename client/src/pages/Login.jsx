import {Button} from "@/components/ui/button"
import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {
    Tabs, TabsContent, TabsList, TabsTrigger,
} from "@/components/ui/tabs"
import {useEffect, useState} from "react";
import {useLogInUserMutation, useRegisterUserMutation} from "@/features/api/authApi.js";
import {Loader2} from "lucide-react";
import {toast} from "sonner";

const Login = () => {
    const [singUpInput, setSingUpInput] = useState({name: "", email: "", password: ""})
    const [loginInput, setLoginInput] = useState({email: "", password: ""})

    const [registerUser, {
        data: registerData, error: registerError, isLoading: registerIsLoading, isSuccess: registerSuccess
    }] = useRegisterUserMutation();
    const [logInUser, {
        data: logInData, error: logInError, isLoading: logInIsLoading, isSuccess: logInSuccess
    }] = useLogInUserMutation();


    const changeInputHandler = (e, type) => {
        const {name, value} = e.target

        if (type === "singUp") {
            setSingUpInput({...singUpInput, [name]: value})
        } else {
            setLoginInput({...loginInput, [name]: value})
        }

    }
    const handleRegistetion = async (type) => {
        const inputData = type === "singUp" ? singUpInput : loginInput;
        const action = type === "singUp" ? registerUser : logInUser;
        await action(inputData);
        // type === "singUp" ? console.log("registerData:",registerData, registerError):console.log(logInData, logInError)

    }

    useEffect(() => {
        if(registerSuccess && registerData){
            toast.success(registerData.message || "Registration successful")
        }
        if(registerError){
            toast.error(registerError.data.message || "Registration failed")

        }
        if(logInSuccess && logInData){
            toast.success(logInData.message || "Login successful")
        }
        if(logInError){
            toast.error(logInError.data.message || "Login failed")

        }


    }, [logInIsLoading, registerIsLoading, logInData, registerData, logInError, registerError]);

    return (<section className={"flex justify-center items-center w-full"}>
        <Tabs defaultValue="login" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="singUp">sing up </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <Card>
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>
                            Login with your password here. After signup, you'll be logged in.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="username">Email</Label>
                            <Input
                                name="email"
                                value={loginInput.email}
                                onChange={(e) => changeInputHandler(e, "login")}
                                type="email"
                                placeholder="YourEmail@.com"
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">password</Label>
                            <Input
                                name={"password"}
                                value={loginInput.password}
                                onChange={(e) => changeInputHandler(e, "login")}
                                type="password"
                                placeholder="*****"
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            disabled={logInIsLoading}
                            onClick={() => handleRegistetion("login")}>
                            {logInIsLoading ? (<>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait
                            </>) : "Log In"}
                        </Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="singUp">
                <Card>
                    <CardHeader>
                        <CardTitle>Sing Up </CardTitle>
                        <CardDescription>
                            Create a new account and click signup when you're done.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                type="text"
                                placeholder="Your Name"
                                name="name"
                                value={singUpInput.name}
                                onChange={(e) => changeInputHandler(e, "singUp")}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="username">Email</Label>
                            <Input
                                type="email"
                                placeholder="YourEmail@.com"
                                required
                                name="email"
                                value={singUpInput.email}
                                onChange={(e) => changeInputHandler(e, "singUp")}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">password</Label>
                            <Input
                                type="password"
                                placeholder="*****"
                                required
                                name={"password"}
                                value={singUpInput.password}
                                onChange={(e) => changeInputHandler(e, "singUp")}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            disabled={registerIsLoading}
                            onClick={() => handleRegistetion("singUp")}>
                            {registerIsLoading ? (<>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait
                            </>) : "Sing up"}
                        </Button>
                    </CardFooter>
                </Card>
            </TabsContent>

        </Tabs>
    </section>)
}

export default Login