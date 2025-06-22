// import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { setToken, setUser } from '../features/User/UserSlice';
// import { motion, AnimatePresence } from 'framer-motion';
// import { BeatLoader } from 'react-spinners';
// import { userService } from '../Service/userService';

// const OAuthSuccessPage = () => {
//     const dispatch = useDispatch();
//     const location = useLocation();
//     const navigate = useNavigate();
//     const [status, setStatus] = useState<'init' | 'loading' | 'success' | 'error'>('init');
//     const [progress, setProgress] = useState(0);

//     useEffect(() => {
//         const processOAuth = async () => {
//             setStatus('loading');
//             const timer = setInterval(() => {
//                 setProgress(prev => Math.min(prev + 10, 90));
//             }, 300);

//             try {
//                 const hash = location.hash || window.location.hash;
//                 const match = hash.match(/token=([^&]*)&userId=([^&]*)/);

//                 if (!match || !match[1] || !match[2]) {
//                     throw new Error('Invalid OAuth response');
//                 }

//                 const token = match[1];
//                 const userId = match[2];

//                 dispatch(setToken(token));
//                 setProgress(50);


//                 const userData = await userService.getOauthUserData(token, userId);

//                 if (userData.success) {
//                     dispatch(setUser(userData.data));
//                     setStatus('success');
//                     setProgress(100);
//                     setTimeout(() => navigate('/home'), 1500);
//                 } else {
//                     throw new Error('Failed to load user data');
//                 }
//             } catch (error) {
//                 setStatus('error');
//                 setProgress(100);
//                 console.error('OAuth Error:', error);
//                 setTimeout(() => navigate('/login'), 2000);
//             } finally {
//                 clearInterval(timer);
//             }
//         };

//         processOAuth();
//     }, [location, navigate, dispatch]);

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
//             <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//                 className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden"
//             >
//                 <div className="p-8 text-center">
//                     <AnimatePresence mode="wait">
//                         {status === 'loading' && (
//                             <motion.div
//                                 key="loading"
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 1 }}
//                                 exit={{ opacity: 0 }}
//                                 className="flex flex-col items-center"
//                             >
//                                 <div className="relative w-20 h-20 mb-6">
//                                     <motion.div
//                                         animate={{ rotate: 360 }}
//                                         transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
//                                         className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full"
//                                     />
//                                     <div className="absolute inset-2 flex items-center justify-center">
//                                         <svg
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             className="h-8 w-8 text-blue-600"
//                                             fill="none"
//                                             viewBox="0 0 24 24"
//                                             stroke="currentColor"
//                                         >
//                                             <path
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                                 strokeWidth={2}
//                                                 d="M12 15l8-8m0 0l-8-8m8 8H4"
//                                             />
//                                         </svg>
//                                     </div>
//                                 </div>
//                                 <h3 className="text-xl font-semibold text-gray-800 mb-2">Authenticating</h3>
//                                 <p className="text-gray-600 mb-6">Please wait while we verify your credentials</p>
//                                 <BeatLoader color="#3b82f6" size={10} />
//                             </motion.div>
//                         )}

//                         {status === 'success' && (
//                             <motion.div
//                                 key="success"
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 exit={{ opacity: 0 }}
//                                 className="flex flex-col items-center"
//                             >
//                                 <motion.div
//                                     initial={{ scale: 0 }}
//                                     animate={{ scale: 1 }}
//                                     transition={{ type: 'spring', stiffness: 200 }}
//                                     className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
//                                 >
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         className="h-10 w-10 text-green-600"
//                                         fill="none"
//                                         viewBox="0 0 24 24"
//                                         stroke="currentColor"
//                                     >
//                                         <path
//                                             strokeLinecap="round"
//                                             strokeLinejoin="round"
//                                             strokeWidth={2}
//                                             d="M5 13l4 4L19 7"
//                                         />
//                                     </svg>
//                                 </motion.div>
//                                 <h3 className="text-xl font-semibold text-gray-800 mb-2">Success!</h3>
//                                 <p className="text-gray-600 mb-6">You're being redirected to your dashboard</p>
//                                 <div className="w-full bg-gray-200 rounded-full h-2">
//                                     <motion.div
//                                         className="bg-green-500 h-2 rounded-full"
//                                         initial={{ width: '100%' }}
//                                         animate={{ width: '0%' }}
//                                         transition={{ duration: 1.5 }}
//                                     />
//                                 </div>
//                             </motion.div>
//                         )}

//                         {status === 'error' && (
//                             <motion.div
//                                 key="error"
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 exit={{ opacity: 0 }}
//                                 className="flex flex-col items-center"
//                             >
//                                 <motion.div
//                                     initial={{ scale: 0 }}
//                                     animate={{ scale: 1 }}
//                                     transition={{ type: 'spring', stiffness: 200 }}
//                                     className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6"
//                                 >
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         className="h-10 w-10 text-red-600"
//                                         fill="none"
//                                         viewBox="0 0 24 24"
//                                         stroke="currentColor"
//                                     >
//                                         <path
//                                             strokeLinecap="round"
//                                             strokeLinejoin="round"
//                                             strokeWidth={2}
//                                             d="M6 18L18 6M6 6l12 12"
//                                         />
//                                     </svg>
//                                 </motion.div>
//                                 <h3 className="text-xl font-semibold text-gray-800 mb-2">Authentication Failed</h3>
//                                 <p className="text-gray-600 mb-6">Redirecting you to login page</p>
//                                 <div className="w-full bg-gray-200 rounded-full h-2">
//                                     <motion.div
//                                         className="bg-red-500 h-2 rounded-full"
//                                         initial={{ width: '100%' }}
//                                         animate={{ width: '0%' }}
//                                         transition={{ duration: 2 }}
//                                     />
//                                 </div>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>
//                 </div>

//                 {/* Progress bar at bottom */}
//                 <div className="h-1.5 bg-gray-100 w-full">
//                     <motion.div
//                         className="h-full bg-blue-500"
//                         initial={{ width: 0 }}
//                         animate={{ width: `${progress}%` }}
//                         transition={{ duration: 0.3 }}
//                     />
//                 </div>
//             </motion.div>

//             <motion.p
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.5 }}
//                 className="mt-8 text-sm text-gray-500 text-center max-w-md"
//             >
//                 {status === 'loading' && 'Securely connecting to your account...'}
//                 {status === 'success' && 'All set! Redirecting you now...'}
//                 {status === 'error' && 'Please try logging in again...'}
//             </motion.p>
//         </div>
//     );
// };

// export default OAuthSuccessPage;






import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setToken, setUser } from '../features/User/UserSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { BeatLoader } from 'react-spinners';
import { userService } from '../Service/userService';

const OAuthSuccessPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [status, setStatus] = useState<'init' | 'loading' | 'success' | 'error'>('init');
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const processOAuth = async () => {
            setStatus('loading');
            const timer = setInterval(() => {
                setProgress(prev => Math.min(prev + 10, 90));
            }, 300);

            try {
                const hash = location.hash || window.location.hash;
                const match = hash.match(/token=([^&]*)&userId=([^&]*)/);

                if (!match || !match[1] || !match[2]) {
                    throw new Error('Invalid OAuth response');
                }

                const token = match[1];
                const userId = match[2];

                dispatch(setToken(token));
                setProgress(50);

                const userData = await userService.getOauthUserData(token, userId);

                if (userData.success) {
                    dispatch(setUser(userData.data));
                    setStatus('success');
                    setProgress(100);
                    setTimeout(() => navigate('/home'), 1500);
                } else {
                    throw new Error('Failed to load user data');
                }
            } catch (error) {
                setStatus('error');
                setProgress(100);
                console.error('OAuth Error:', error);
                setTimeout(() => navigate('/login'), 2000);
            } finally {
                clearInterval(timer);
            }
        };

        processOAuth();
    }, [location, navigate, dispatch]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
            >
                <div className="p-8 text-center">
                    <AnimatePresence mode="wait">
                        {status === 'loading' && (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center"
                            >
                                <div className="relative w-24 h-24 mb-6">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ 
                                            repeat: Infinity, 
                                            duration: 1.8, 
                                            ease: "linear" 
                                        }}
                                        className="absolute inset-0 border-4 border-indigo-400 border-t-transparent rounded-full"
                                        style={{
                                            borderImage: 'linear-gradient(to right, #818cf8, #4f46e5) 1'
                                        }}
                                    />
                                    <div className="absolute inset-2 flex items-center justify-center">
                                        <motion.div
                                            animate={{ 
                                                y: [-3, 3, -3],
                                                rotate: [0, 5, -5, 0]
                                            }}
                                            transition={{ 
                                                repeat: Infinity, 
                                                duration: 1.5,
                                                ease: "easeInOut"
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-10 w-10 text-indigo-600"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 15l8-8m0 0l-8-8m8 8H4"
                                                />
                                            </svg>
                                        </motion.div>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-800 mb-3">Securing Your Connection</h3>
                                <p className="text-gray-500 mb-6">Verifying your credentials with our secure servers</p>
                                <div className="flex justify-center">
                                    <BeatLoader color="#4f46e5" size={12} margin={4} />
                                </div>
                            </motion.div>
                        )}

                        {status === 'success' && (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center"
                            >
                                <motion.div
                                    initial={{ scale: 0, rotate: -45 }}
                                    animate={{ 
                                        scale: 1, 
                                        rotate: 0,
                                        transition: { 
                                            type: 'spring', 
                                            stiffness: 300,
                                            damping: 15
                                        }
                                    }}
                                    className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-inner"
                                >
                                    <motion.div
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-12 w-12 text-emerald-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={3}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </motion.div>
                                </motion.div>
                                <h3 className="text-2xl font-semibold text-gray-800 mb-3">Welcome Aboard!</h3>
                                <p className="text-gray-500 mb-8">Authentication successful. Redirecting you now...</p>
                                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                    <motion.div
                                        className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-2 rounded-full"
                                        initial={{ width: '100%' }}
                                        animate={{ width: '0%' }}
                                        transition={{ duration: 1.5, ease: "linear" }}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {status === 'error' && (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center"
                            >
                                <motion.div
                                    initial={{ scale: 0, rotate: 45 }}
                                    animate={{ 
                                        scale: 1, 
                                        rotate: 0,
                                        transition: { 
                                            type: 'spring', 
                                            stiffness: 300,
                                            damping: 15
                                        }
                                    }}
                                    className="w-24 h-24 bg-gradient-to-br from-red-100 to-rose-100 rounded-full flex items-center justify-center mb-6 shadow-inner"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-12 w-12 text-rose-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={3}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </motion.div>
                                </motion.div>
                                <h3 className="text-2xl font-semibold text-gray-800 mb-3">Authentication Failed</h3>
                                <p className="text-gray-500 mb-8">We couldn't verify your credentials. Redirecting to login...</p>
                                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                    <motion.div
                                        className="bg-gradient-to-r from-rose-400 to-rose-600 h-2 rounded-full"
                                        initial={{ width: '100%' }}
                                        animate={{ width: '0%' }}
                                        transition={{ duration: 2, ease: "linear" }}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Progress bar at bottom */}
                <div className="h-1.5 bg-gray-100 w-full relative overflow-hidden">
                    <motion.div
                        className="h-full absolute top-0 left-0 bg-gradient-to-r from-indigo-400 to-indigo-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8 text-center max-w-md"
            >
                <p className="text-sm text-gray-500 mb-2">
                    {status === 'loading' && 'This should only take a moment...'}
                    {status === 'success' && 'Your account is ready to go!'}
                    {status === 'error' && 'Please try again with valid credentials'}
                </p>
                <div className="flex items-center justify-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-indigo-400 animate-pulse"></div>
                    <p className="text-xs text-gray-400">
                        {status === 'loading' && 'Secure connection established'}
                        {status === 'success' && 'All systems operational'}
                        {status === 'error' && 'Connection terminated'}
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default OAuthSuccessPage;