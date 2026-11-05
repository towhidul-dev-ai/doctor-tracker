// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import {
//   HeartHandshake,
//   Mail,
//   LockKeyhole,
//   Eye,
//   EyeOff,
//   ArrowRight,
//   AlertCircle,
//   Loader2,
// } from "lucide-react";

// import { authClient } from "@/lib/auth-client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";

// export default function LoginPage() {
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const [loading, setLoading] = useState(false);
//   const [githubLoading, setGithubLoading] = useState(false);

//   const [error, setError] = useState("");
//   const [submitted, setSubmitted] = useState(false);

//   const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   const passwordValid = password.length > 0;

//   const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     setSubmitted(true);
//     setError("");

//     if (!emailValid || !passwordValid) {
//       setError("Please enter a valid email and password.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const { error: loginError } = await authClient.signIn.email({
//         email: email.trim(),
//         password,
//         callbackURL: "/dashboard",
//       });

//       if (loginError) {
//         setError(loginError.message || "Unable to sign in.");
//         return;
//       }

//       router.push("/dashboard");
//       router.refresh();
//     } catch {
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGitHubLogin = async () => {
//     setError("");
//     setGithubLoading(true);

//     try {
//       const { error: githubError } = await authClient.signIn.social({
//         provider: "github",
//         callbackURL: "/dashboard",
//       });

//       if (githubError) {
//         setError(githubError.message || "GitHub sign-in failed.");
//         setGithubLoading(false);
//       }
//     } catch {
//       setError("Unable to continue with GitHub.");
//       setGithubLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-slate-50 px-4 py-10">
//       <div className="mx-auto grid min-h-[80vh] max-w-6xl items-center gap-10 lg:grid-cols-2">
//         {/* Left side */}
//         <section className="hidden space-y-6 lg:block">
//           <Link
//             href="/"
//             className="inline-flex items-center gap-2 text-xl font-bold text-blue-700"
//           >
//             <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
//               <HeartHandshake size={22} />
//             </span>
//             Doctor Tracker
//           </Link>

//           <div className="max-w-lg space-y-4">
//             <h1 className="text-4xl font-bold leading-tight text-slate-900">
//               Welcome back to better healthcare organization.
//             </h1>

//             <p className="text-lg leading-8 text-slate-600">
//               Sign in to manage your doctor information and continue keeping
//               your healthcare workflow organized.
//             </p>
//           </div>

//           <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
//             <div className="flex items-center gap-3">
//               <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
//                 <LockKeyhole size={24} />
//               </div>

//               <div>
//                 <p className="font-semibold text-slate-900">
//                   Your workspace is waiting
//                 </p>
//                 <p className="text-sm text-slate-600">
//                   Sign in securely to access your dashboard.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Login form */}
//         <section className="mx-auto w-full max-w-md">
//           <div className="mb-6 text-center lg:hidden">
//             <Link
//               href="/"
//               className="inline-flex items-center gap-2 text-xl font-bold text-blue-700"
//             >
//               <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
//                 <HeartHandshake size={22} />
//               </span>
//               Doctor Tracker
//             </Link>
//           </div>

//           <Card className="border-slate-200 shadow-xl shadow-blue-100/40">
//             <CardHeader className="space-y-2 text-center">
//               <CardTitle className="text-2xl font-bold">
//                 Welcome back
//               </CardTitle>

//               <CardDescription>
//                 Sign in to your Doctor Tracker account.
//               </CardDescription>
//             </CardHeader>

//             <CardContent className="space-y-5">
//               {error && (
//                 <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
//                   <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
//                   <p>{error}</p>
//                 </div>
//               )}

//               <form onSubmit={handleLogin} className="space-y-4">
//                 {/* Email */}
//                 <div className="space-y-2">
//                   <Label htmlFor="email">Email address</Label>

//                   <div className="relative">
//                     <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

//                     <Input
//                       id="email"
//                       type="email"
//                       placeholder="you@example.com"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       className="pl-10"
//                       autoComplete="email"
//                       required
//                     />
//                   </div>

//                   {submitted && !emailValid && (
//                     <p className="text-xs text-red-500">
//                       Please enter a valid email address.
//                     </p>
//                   )}
//                 </div>

//                 {/* Password */}
//                 <div className="space-y-2">
//                   <div className="flex items-center justify-between">
//                     <Label htmlFor="password">Password</Label>
//                   </div>

//                   <div className="relative">
//                     <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

//                     <Input
//                       id="password"
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Enter your password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       className="pl-10 pr-10"
//                       autoComplete="current-password"
//                       required
//                     />

//                     <button
//                       type="button"
//                       onClick={() => setShowPassword((prev) => !prev)}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
//                       aria-label={
//                         showPassword ? "Hide password" : "Show password"
//                       }
//                     >
//                       {showPassword ? (
//                         <EyeOff className="h-4 w-4" />
//                       ) : (
//                         <Eye className="h-4 w-4" />
//                       )}
//                     </button>
//                   </div>

//                   {submitted && !passwordValid && (
//                     <p className="text-xs text-red-500">
//                       Please enter your password.
//                     </p>
//                   )}
//                 </div>

//                 {/* Login button */}
//                 <Button
//                   type="submit"
//                   className="w-full bg-blue-600 hover:bg-blue-700"
//                   disabled={loading || githubLoading}
//                 >
//                   {loading ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Signing in...
//                     </>
//                   ) : (
//                     <>
//                       Sign in
//                       <ArrowRight className="ml-2 h-4 w-4" />
//                     </>
//                   )}
//                 </Button>
//               </form>

//               {/* Divider */}
//               <div className="relative">
//                 <Separator />

//                 <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-slate-500">
//                   OR CONTINUE WITH
//                 </span>
//               </div>

//               {/* GitHub login */}
//               <Button
//                 type="button"
//                 variant="outline"
//                 className="w-full"
//                 onClick={handleGitHubLogin}
//                 disabled={loading || githubLoading}
//               >
//                 {githubLoading ? (
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 ) : (
//                   <svg
//                     className="mr-2 h-4 w-4"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                     aria-hidden="true"
//                   >
//                     <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.42-4.04-1.42-.55-1.4-1.33-1.77-1.33-1.77-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.62-2.8 5.64-5.48 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
//                   </svg>
//                 )}

//                 Continue with GitHub
//               </Button>

//               {/* Signup link */}
//               <p className="text-center text-sm text-slate-600">
//                 Don&apos;t have an account?{" "}
//                 <Link
//                   href="/sign-up"
//                   className="font-semibold text-blue-600 hover:text-blue-700"
//                 >
//                   Create account
//                 </Link>
//               </p>
//             </CardContent>
//           </Card>

//           <p className="mt-5 text-center text-xs text-slate-500">
//             Securely access your Doctor Tracker workspace.
//           </p>
//         </section>
//       </div>
//     </main>
//   );
// }

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import {
//   HeartHandshake,
//   Mail,
//   LockKeyhole,
//   Eye,
//   EyeOff,
//   ArrowRight,
//   AlertCircle,
//   Loader2,
// } from "lucide-react";

// import { authClient } from "@/lib/auth-client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const [loading, setLoading] = useState(false);
//   const [githubLoading, setGithubLoading] = useState(false);

//   const [error, setError] = useState("");
//   const [submitted, setSubmitted] = useState(false);

//   const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   const passwordValid = password.length > 0;

//   const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     setSubmitted(true);
//     setError("");

//     if (!emailValid || !passwordValid) {
//       setError("Please enter a valid email and password.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const { error: loginError } = await authClient.signIn.email({
//         email: email.trim(),
//         password,
//         callbackURL: "/dashboard",
//       });

//       if (loginError) {
//         setError(loginError.message || "Unable to sign in.");
//         return;
//       }

//       // Redirect to dashboard after successful login
//       window.location.href = "/dashboard";
//     } catch {
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGitHubLogin = async () => {
//     setError("");
//     setGithubLoading(true);

//     try {
//       const { error: githubError } = await authClient.signIn.social({
//         provider: "github",
//         callbackURL: "/dashboard",
//       });

//       if (githubError) {
//         setError(githubError.message || "GitHub sign-in failed.");
//         setGithubLoading(false);
//       }
//     } catch {
//       setError("Unable to continue with GitHub.");
//       setGithubLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-slate-50 px-4 py-10">
//       <div className="mx-auto grid min-h-[80vh] max-w-6xl items-center gap-10 lg:grid-cols-2">
//         {/* Left side */}
//         <section className="hidden space-y-6 lg:block">
//           <Link
//             href="/"
//             className="inline-flex items-center gap-2 text-xl font-bold text-blue-700"
//           >
//             <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
//               <HeartHandshake size={22} />
//             </span>
//             Doctor Tracker
//           </Link>

//           <div className="max-w-lg space-y-4">
//             <h1 className="text-4xl font-bold leading-tight text-slate-900">
//               Welcome back to better healthcare organization.
//             </h1>

//             <p className="text-lg leading-8 text-slate-600">
//               Sign in to manage your doctor information and continue keeping
//               your healthcare workflow organized.
//             </p>
//           </div>

//           <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
//             <div className="flex items-center gap-3">
//               <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
//                 <LockKeyhole size={24} />
//               </div>

//               <div>
//                 <p className="font-semibold text-slate-900">
//                   Your workspace is waiting
//                 </p>

//                 <p className="text-sm text-slate-600">
//                   Sign in securely to access your dashboard.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Login form */}
//         <section className="mx-auto w-full max-w-md">
//           <div className="mb-6 text-center lg:hidden">
//             <Link
//               href="/"
//               className="inline-flex items-center gap-2 text-xl font-bold text-blue-700"
//             >
//               <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
//                 <HeartHandshake size={22} />
//               </span>
//               Doctor Tracker
//             </Link>
//           </div>

//           <Card className="border-slate-200 shadow-xl shadow-blue-100/40">
//             <CardHeader className="space-y-2 text-center">
//               <CardTitle className="text-2xl font-bold">
//                 Welcome back
//               </CardTitle>

//               <CardDescription>
//                 Sign in to your Doctor Tracker account.
//               </CardDescription>
//             </CardHeader>

//             <CardContent className="space-y-5">
//               {error && (
//                 <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
//                   <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
//                   <p>{error}</p>
//                 </div>
//               )}

//               <form onSubmit={handleLogin} className="space-y-4">
//                 {/* Email */}
//                 <div className="space-y-2">
//                   <Label htmlFor="email">Email address</Label>

//                   <div className="relative">
//                     <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

//                     <Input
//                       id="email"
//                       type="email"
//                       placeholder="you@example.com"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       className="pl-10"
//                       autoComplete="email"
//                       required
//                     />
//                   </div>

//                   {submitted && !emailValid && (
//                     <p className="text-xs text-red-500">
//                       Please enter a valid email address.
//                     </p>
//                   )}
//                 </div>

//                 {/* Password */}
//                 <div className="space-y-2">
//                   <Label htmlFor="password">Password</Label>

//                   <div className="relative">
//                     <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

//                     <Input
//                       id="password"
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Enter your password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       className="pl-10 pr-10"
//                       autoComplete="current-password"
//                       required
//                     />

//                     <button
//                       type="button"
//                       onClick={() => setShowPassword((prev) => !prev)}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
//                       aria-label={
//                         showPassword ? "Hide password" : "Show password"
//                       }
//                     >
//                       {showPassword ? (
//                         <EyeOff className="h-4 w-4" />
//                       ) : (
//                         <Eye className="h-4 w-4" />
//                       )}
//                     </button>
//                   </div>

//                   {submitted && !passwordValid && (
//                     <p className="text-xs text-red-500">
//                       Please enter your password.
//                     </p>
//                   )}
//                 </div>

//                 {/* Sign-in button */}
//                 <Button
//                   type="submit"
//                   className="w-full bg-blue-600 hover:bg-blue-700"
//                   disabled={loading || githubLoading}
//                 >
//                   {loading ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Signing in...
//                     </>
//                   ) : (
//                     <>
//                       Sign in
//                       <ArrowRight className="ml-2 h-4 w-4" />
//                     </>
//                   )}
//                 </Button>
//               </form>

//               {/* Divider */}
//               <div className="relative">
//                 <Separator />

//                 <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-slate-500">
//                   OR CONTINUE WITH
//                 </span>
//               </div>

//               {/* GitHub login */}
//               <Button
//                 type="button"
//                 variant="outline"
//                 className="w-full"
//                 onClick={handleGitHubLogin}
//                 disabled={loading || githubLoading}
//               >
//                 {githubLoading ? (
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 ) : (
//                   <svg
//                     className="mr-2 h-4 w-4"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                     aria-hidden="true"
//                   >
//                     <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.42-4.04-1.42-.55-1.4-1.33-1.77-1.33-1.77-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.62-2.8 5.64-5.48 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
//                   </svg>
//                 )}

//                 Continue with GitHub
//               </Button>

//               {/* Signup link */}
//               <p className="text-center text-sm text-slate-600">
//                 Don&apos;t have an account?{" "}
//                 <Link
//                   href="/sign-up"
//                   className="font-semibold text-blue-600 hover:text-blue-700"
//                 >
//                   Create account
//                 </Link>
//               </p>
//             </CardContent>
//           </Card>

//           <p className="mt-5 text-center text-xs text-slate-500">
//             Securely access your Doctor Tracker workspace.
//           </p>
//         </section>
//       </div>
//     </main>
//   );
// }

"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HeartHandshake,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  Loader2,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);

  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const passwordValid = password.length > 0;

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitted(true);
    setError("");

    if (!emailValid || !passwordValid) {
      setError("Please enter a valid email and password.");
      return;
    }

    setLoading(true);

    try {
      const { error: loginError } = await authClient.signIn.email({
        email: email.trim(),
        password,
        callbackURL: "/dashboard",
      });

      if (loginError) {
        setError(loginError.message || "Unable to sign in.");
        return;
      }

      // Navigate after successful sign-in.
      window.location.href = "/dashboard";
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubLogin = async () => {
    setError("");
    setGithubLoading(true);

    try {
      const { error: githubError } = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/dashboard",
      });

      if (githubError) {
        setError(githubError.message || "GitHub sign-in failed.");
        setGithubLoading(false);
      }
    } catch {
      setError("Unable to continue with GitHub.");
      setGithubLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto grid min-h-[80vh] max-w-6xl items-center gap-10 lg:grid-cols-2">
        {/* Left side */}
        <section className="hidden space-y-6 lg:block">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xl font-bold text-blue-700"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <HeartHandshake size={22} />
            </span>
            Doctor Tracker
          </Link>

          <div className="max-w-lg space-y-4">
            <h1 className="text-4xl font-bold leading-tight text-slate-900">
              Welcome back to better healthcare organization.
            </h1>

            <p className="text-lg leading-8 text-slate-600">
              Sign in to manage your doctor information and continue keeping
              your healthcare workflow organized.
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                <LockKeyhole size={24} />
              </div>

              <div>
                <p className="font-semibold text-slate-900">
                  Your workspace is waiting
                </p>

                <p className="text-sm text-slate-600">
                  Sign in securely to access your dashboard.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Login form */}
        <section className="mx-auto w-full max-w-md">
          <div className="mb-6 text-center lg:hidden">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xl font-bold text-blue-700"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                <HeartHandshake size={22} />
              </span>
              Doctor Tracker
            </Link>
          </div>

          <Card className="border-slate-200 shadow-xl shadow-blue-100/40">
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="text-2xl font-bold">
                Welcome back
              </CardTitle>

              <CardDescription>
                Sign in to your Doctor Tracker account.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              {error && (
                <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      autoComplete="email"
                      required
                    />
                  </div>

                  {submitted && !emailValid && (
                    <p className="text-xs text-red-500">
                      Please enter a valid email address.
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>

                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      autoComplete="current-password"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {submitted && !passwordValid && (
                    <p className="text-xs text-red-500">
                      Please enter your password.
                    </p>
                  )}
                </div>

                {/* Sign-in button */}
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={loading || githubLoading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative">
                <Separator />

                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-slate-500">
                  OR CONTINUE WITH
                </span>
              </div>

              {/* GitHub login */}
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGitHubLogin}
                disabled={loading || githubLoading}
              >
                {githubLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <svg
                    className="mr-2 h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.42-4.04-1.42-.55-1.4-1.33-1.77-1.33-1.77-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.62-2.8 5.64-5.48 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
                  </svg>
                )}

                Continue with GitHub
              </Button>

              {/* Signup link */}
              <p className="text-center text-sm text-slate-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/sign-up"
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  Create account
                </Link>
              </p>
            </CardContent>
          </Card>

          <p className="mt-5 text-center text-xs text-slate-500">
            Securely access your Doctor Tracker workspace.
          </p>
        </section>
      </div>
    </main>
  );
}