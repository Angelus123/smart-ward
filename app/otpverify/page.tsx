'use client';
import { useState, useEffect, useRef, FormEvent, Suspense } from 'react';
import Head from 'next/head';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTheme, ThemeProvider } from 'next-themes';
import { AuthProvider } from '../context/AuthContext';

function EmailVerificationContent() {
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
    const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState(false);
    const [canResend, setCanResend] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const otpInputs = useRef<(HTMLInputElement | null)[]>([]);
    const { theme } = useTheme();

    // Theme-based styling
    const themeStyles = {
        bgColor: theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-[#f0f4f8] to-[#e2e8f0]',
        textColor: theme === 'dark' ? 'text-white' : 'text-gray-800',
        secondaryTextColor: theme === 'dark' ? 'text-gray-300' : 'text-gray-500',
        cardBg: theme === 'dark' ? 'bg-gray-800' : 'bg-white',
        welcomeBg: theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-[#005bbb] to-[#003366]',
        inputBg: theme === 'dark' ? 'bg-gray-700' : 'bg-white',
        inputBorder: theme === 'dark' ? 'border-gray-600' : 'border-gray-300',
        buttonBg: theme === 'dark' ? 'bg-gradient-to-r from-blue-700 to-blue-800' : 'bg-gradient-to-r from-[#005bbb] to-[#0066cc]',
        successBg: theme === 'dark' ? 'bg-green-900' : 'bg-green-50',
        successBorder: theme === 'dark' ? 'border-green-700' : 'border-green-200',
        successText: theme === 'dark' ? 'text-green-300' : 'text-green-700',
        errorBg: theme === 'dark' ? 'bg-red-900' : 'bg-red-50',
        errorBorder: theme === 'dark' ? 'border-red-700' : 'border-red-200',
        errorText: theme === 'dark' ? 'text-red-300' : 'text-red-700',
        infoBg: theme === 'dark' ? 'bg-blue-900' : 'bg-blue-50',
        infoBorder: theme === 'dark' ? 'border-blue-700' : 'border-blue-200',
        infoText: theme === 'dark' ? 'text-blue-300' : 'text-blue-700',
        welcomeText: theme === 'dark' ? 'text-blue-200' : 'text-blue-100',
        welcomeSecondaryText: theme === 'dark' ? 'text-blue-300' : 'text-blue-200',
    };

    // Handle logo click to redirect home
    const handleLogoClick = () => {
        router.push('/');
    };

    const handleSignUpClick = () => {
        router.push('/signup');
    }

    // Timer effect
    useEffect(() => {
        if (timeLeft <= 0) {
            setCanResend(true);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    // Get email from URL params
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        const emailParam = searchParams.get('email');
        if (emailParam) {
            setEmail(decodeURIComponent(emailParam));
        }
    }, [searchParams]);

    // Format time display
    const formatTime = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    // Handle OTP input change
    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return; // Only allow numbers

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to next input if a digit was entered
        if (value && index < 5) {
            otpInputs.current[index + 1]?.focus();
        }
    };

    // Handle backspace
    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpInputs.current[index - 1]?.focus();
        }
    };

    // Handle paste
    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text');
        const digits = pasteData.replace(/\D/g, '').slice(0, 6);

        const newOtp = [...otp];
        digits.split('').forEach((digit, i) => {
            if (i < 6) newOtp[i] = digit;
        });
        setOtp(newOtp);
    };

    // Check if OTP is complete
    const isOtpComplete = otp.every(digit => digit !== '');

    // Handle form submission
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(false);

        try {
            const response = await fetch('https://tai-smart-home.onrender.com/api/auth/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp: otp.join('') }),
            });

            if (response.ok) {
                setIsVerified(true);
                setTimeout(() => {
                    router.push('/login');
                }, 1500);
            } else {
                setError(true);
                setTimeout(() => {
                    setOtp(['', '', '', '', '', '']);
                    otpInputs.current[0]?.focus();
                }, 1500);
            }
        } catch (err) {
            setError(true);
            setTimeout(() => {
                setOtp(['', '', '', '', '', '']);
                otpInputs.current[0]?.focus();
            }, 1500);
            console.log('Error verifying OTP:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle resend
    const handleResend = () => {
        if (!canResend) return;

        setTimeLeft(600);
        setCanResend(false);
        setOtp(['', '', '', '', '', '']);
        setError(false);
        otpInputs.current[0]?.focus();
    };

    return (
        <>
            <Head>
                <title>Verify Your Email - Hobpeg</title>
            </Head>

            <div className={`min-h-screen flex items-center justify-center p-5 ${themeStyles.bgColor}`}>
                <div className={`w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[600px] ${themeStyles.cardBg}`}>
                    {/* Left Panel */}
                    <div className={`welcome-section ${themeStyles.welcomeBg} text-white p-12 flex flex-col justify-center relative hidden md:block`}>
                        <div className="relative z-10">
                            <div className="bg-white/10 p-4 rounded-xl w-fit mb-4 md:block cursor-pointer" onClick={handleLogoClick}>
                                <svg className="w-12 h-12" fill="white" viewBox="0 0 24 24">
                                    <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91c4.59-1.15 8-5.86 8-10.91V5L12 2z" />
                                    <path d="M9 12l2 2l4-4" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold mb-5">Hobpeg</h1>
                            <h2 className={`text-2xl font-semibold mb-6 ${themeStyles.welcomeText}`}>Email Verification</h2>
                            <p className={`text-base leading-relaxed mb-10 ${themeStyles.welcomeSecondaryText}`}>
                                We&apos;ve sent a verification code to your email address. Enter the code below to complete your account setup and start securing your digital workspace.
                            </p>

                            {[
                                {
                                    title: "Secure Verification",
                                    description: "Your verification code is encrypted and expires in 10 minutes for maximum security"
                                },
                                {
                                    title: "Instant Activation",
                                    description: "Once verified, you'll have immediate access to all Hobpeg features"
                                },
                                {
                                    title: "Account Protection",
                                    description: "Email verification helps protect your account from unauthorized access"
                                }
                            ].map((feature, index) => (
                                <div key={index} className="flex items-start mb-6">
                                    <li className="flex items-start gap-3 feature">
                                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 12l2 2l4-4" />
                                            <circle cx="12" cy="12" r="9" />
                                        </svg>
                                    </li>
                                    <div>
                                        <h3 className={`text-base font-semibold ${themeStyles.welcomeText}`}>{feature.title}</h3>
                                        <p className={`text-sm ${themeStyles.welcomeSecondaryText}`}>{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Panel */}
                    <div className={`flex-1 p-12 md:p-14 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} flex flex-col justify-center`}>
                        <h2 className={`text-2xl font-bold ${themeStyles.textColor} mb-2`}>Verify Your Email</h2>
                        <div className={`${themeStyles.infoBg} border ${themeStyles.infoBorder} rounded-lg p-4 mb-8 text-center ${themeStyles.infoText}`}>
                            📧 Code sent to <strong className={theme === 'dark' ? 'text-blue-300' : 'text-blue-900'}>{email ?? 'your email'}</strong>
                        </div>

                        {isVerified && (
                            <div className={`${themeStyles.successBg} border-2 ${themeStyles.successBorder} ${themeStyles.successText} p-4 rounded-lg mb-5 text-center`}>
                                <strong>Email Verified Successfully!</strong><br />
                                Your account is now active. Redirecting to dashboard...
                            </div>
                        )}

                        {error && (
                            <div className={`${themeStyles.errorBg} border-2 ${themeStyles.errorBorder} ${themeStyles.errorText} p-4 rounded-lg mb-5 text-center`}>
                                <strong>Invalid Code</strong><br />
                                Please check your code and try again.
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-8">
                                <label className={`block text-sm font-semibold ${themeStyles.textColor} mb-4`}>Verification Code</label>
                                <div className="flex gap-3 justify-center mb-5">
                                    {[0, 1, 2, 3, 4, 5].map((index) => (
                                        <input
                                            key={index}
                                            ref={el => { otpInputs.current[index] = el; }}
                                            type="text"
                                            maxLength={1}
                                            value={otp[index]}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(index, e)}
                                            onPaste={index === 0 ? handlePaste : undefined}
                                            disabled={timeLeft <= 0 || isVerified}
                                            className={`w-12 h-14 border-2 rounded-lg text-xl text-black font-semibold text-center transition-all 
                                            ${otp[index] ? 'border-green-500/30 bg-green-800/30' : themeStyles.inputBorder} 
                                            ${error ? 'border-red-500 bg-red-50' : ''}
                                            focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100
                                            ${themeStyles.inputBg} ${themeStyles.textColor}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="text-center mb-6">
                                <div className={`text-base font-medium 
                                ${timeLeft <= 60 ? 'text-yellow-500' : themeStyles.secondaryTextColor} 
                                ${timeLeft <= 0 ? 'text-red-500' : ''}`}>
                                    {timeLeft > 0 ? `Code expires in ${formatTime()}` : 'Code expired'}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={!isOtpComplete || timeLeft <= 0 || isVerified || isSubmitting}
                                className={`w-full py-4 rounded-lg text-white font-semibold mb-5 transition-all
                                ${(!isOtpComplete || timeLeft <= 0 || isVerified || isSubmitting) ?
                                        'bg-gray-500 cursor-not-allowed' :
                                        `${themeStyles.buttonBg} hover:-translate-y-0.5 hover:shadow-lg`}`}
                            >
                                {isSubmitting ? 'Verifying...' : 'Verify Email'}
                            </button>
                        </form>

                        <div className={`py-5 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} text-center`}>
                            <p className={`text-sm ${themeStyles.secondaryTextColor} mb-2`}>Didn&apos;t receive the code?</p>
                            <button
                                onClick={handleResend}
                                disabled={!canResend}
                                className={`text-sm font-semibold underline ${canResend ? 'text-blue-400 hover:text-blue-300' : 'text-gray-500'}`}
                            >
                                Send Again
                            </button>
                        </div>

                        <div className={`text-center mt-5 text-sm ${themeStyles.secondaryTextColor}`}>
                            Need to change your email? <span
                                className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} font-medium hover:underline cursor-pointer`}
                                onClick={handleSignUpClick}>
                                Go back to signup
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default function EmailVerification() {
    return (
        <ThemeProvider attribute="class" defaultTheme="light">
            <AuthProvider>
                <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading verification...</div>}>
                    <EmailVerificationContent />
                </Suspense>
            </AuthProvider>
        </ThemeProvider>
    );
}

