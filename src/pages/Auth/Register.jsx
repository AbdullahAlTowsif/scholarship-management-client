import Lottie from "lottie-react";
import registerLottie from "../../assets/register-lottie.json"
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";
import { useForm } from "react-hook-form"
import useAuth from "../../hooks/useAuth";
import { imageUpload, saveUser } from "../../api/utils";
import toast from "react-hot-toast";

const Register = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth();

    const onSubmit = async (data) => {
        // console.log(data);
        const imageFile = data.image[0]
        console.log(imageFile);
        const photoURL = await imageUpload(imageFile);
        try{
            const result = await createUser(data.email, data.password)
            await updateUserProfile(data.name, photoURL)
            console.log(result);
            await saveUser({...result?.user, displayName: data.name, photoURL})
            navigate('/')
            toast.success('Signup Successful')
        }
        catch(err){
            console.log(err);
        }
    }

    const handleGoogleSignIn = async() =>{
        try{
            const data = await signInWithGoogle()
            await saveUser(data?.user)
            navigate('/')
            toast.success('SignUp Successful')
        }
        catch(err){
            console.log(err);
        }
    }
    return (
        <div>
            <div className='flex flex-col lg:flex-row justify-center items-center min-h-screen bg-white space-x-5'>
                <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
                    <div className='mb-8 text-center'>
                        <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
                        <p className='text-sm text-gray-400'>Welcome to Scholar Ease</p>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate=''
                        action=''
                        className='space-y-6 ng-untouched ng-pristine ng-valid'
                    >
                        <div className='space-y-4'>
                            <div>
                                <label htmlFor='email' className='block mb-2 text-sm'>
                                    Name
                                </label>
                                <input
                                    type='text'
                                    name='name'
                                    {...register("name", { required: true })}
                                    id='name'
                                    placeholder='Enter Your Name Here'
                                    className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#890C25] bg-gray-200 text-gray-900'
                                    data-temp-mail-org='0'
                                />
                            </div>
                            <div>
                                <label htmlFor='image' className='block mb-2 text-sm'>
                                    Select Image:
                                </label>
                                <input
                                    required
                                    type='file'
                                    {...register("image", { required: true })}
                                    id='image'
                                    name='image'
                                    accept='image/*'
                                />
                            </div>
                            <div>
                                <label htmlFor='email' className='block mb-2 text-sm'>
                                    Email address
                                </label>
                                <input
                                    type='email'
                                    name='email'
                                    {...register("email", { required: true })}
                                    id='email'
                                    required
                                    placeholder='Enter Your Email Here'
                                    className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#890C25] bg-gray-200 text-gray-900'
                                    data-temp-mail-org='0'
                                />
                            </div>
                            <div>
                                <div className='flex justify-between'>
                                    <label htmlFor='password' className='text-sm mb-2'>
                                        Password
                                    </label>
                                </div>
                                <input
                                    type='password'
                                    name='password'
                                    {...register("password", { required: true })}
                                    autoComplete='new-password'
                                    id='password'
                                    required
                                    placeholder='*******'
                                    className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#890C25] bg-gray-200 text-gray-900'
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type='submit'
                                className='bg-[#890C25] w-full rounded-md py-3 text-white'
                            >
                                {loading ? (
                                    <TbFidgetSpinner className='animate-spin m-auto' />
                                ) : (
                                    'Continue'
                                )}
                            </button>
                        </div>
                    </form>
                    <div className='flex items-center pt-4 space-x-1'>
                        <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                        <p className='px-3 text-sm dark:text-gray-400'>
                            Signup with social accounts
                        </p>
                        <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                    </div>
                    <div
                        onClick={handleGoogleSignIn}
                        className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'
                    >
                        <FcGoogle size={32} />

                        <p>Continue with Google</p>
                    </div>
                    <p className='px-6 text-sm text-center text-gray-400'>
                        Already have an account?{' '}
                        <Link
                            to='/auth/login'
                            className='hover:underline hover:text-[#890C25] text-gray-600'
                        >
                            Login
                        </Link>
                        .
                    </p>
                </div>
                <div className="max-w-96">
                    <Lottie animationData={registerLottie}></Lottie>
                </div>
            </div>
        </div>
    );
};

export default Register;