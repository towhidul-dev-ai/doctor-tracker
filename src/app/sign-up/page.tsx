

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import {
//   HeartHandshake,
//   UserRound,
//   Mail,
//   LockKeyhole,
//   Image as ImageIcon,
//   Eye,
//   EyeOff,
//   ArrowRight,
//   Check,
//   X,
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

// export default function SignUpPage() {
//   const router = useRouter();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [image, setImage] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const [loading, setLoading] = useState(false);
//   const [googleLoading, setGoogleLoading] = useState(false);
//   const [error, setError] = useState("");

//   const [submitted, setSubmitted] = useState(false);

//   const nameValid = name.trim().length >= 3;
//   const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   const passwordValid = password.length >= 8;
//   const uppercaseValid = /[A-Z]/.test(password);
//   const lowercaseValid = /[a-z]/.test(password);

//   const imageValid =
//     image.trim() === "" ||
//     (() => {
//       try {
//         const url = new URL(image);
//         return url.protocol === "http:" || url.protocol === "https:";
//       } catch {
//         return false;
//       }
//     })();

//   const formValid =
//     nameValid &&
//     emailValid &&
//     passwordValid &&
//     uppercaseValid &&
//     lowercaseValid &&
//     imageValid;

//   const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setSubmitted(true);
//     setError("");

//     if (!formValid) {
//       setError("Please check your information and try again.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const { error: signUpError } = await authClient.signUp.email({
//         name: name.trim(),
//         email: email.trim(),
//         password,
//         image: image.trim() || undefined,
//         callbackURL: "/dashboard",
//       });

//       if (signUpError) {
//         setError(signUpError.message || "Unable to create your account.");
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

//   const handleGitHubSignUp = async () => {
//   setError("");
//   setGoogleLoading(true);

//   try {
//     const { error: githubError } = await authClient.signIn.social({
//       provider: "github",
//       callbackURL: "/home",
//     });

//     if (githubError) {
//       setError(githubError.message || "GitHub sign-up failed.");
//       setGoogleLoading(false);
//     }
//   } catch {
//     setError("Unable to continue with GitHub.");
//     setGoogleLoading(false);
//   }
// };

// //   const handleGoogleSignUp = async () => {
// //     setError("");
// //     setGoogleLoading(true);

// //     try {
// //       const { error: googleError } = await authClient.signIn.social({
// //         provider: "google",
// //         callbackURL: "/dashboard",
// //       });

// //       if (googleError) {
// //         setError(googleError.message || "Google sign-up failed.");
// //         setGoogleLoading(false);
// //       }
// //     } catch {
// //       setError("Unable to continue with Google.");
// //       setGoogleLoading(false);
// //     }
// //   };

// //   const Requirement = ({
// //     valid,
// //     children,
// //   }: {
// //     valid: boolean;
// //     children: React.ReactNode;
// //   }) => (
// //     <div
// //       className={`flex items-center gap-2 text-xs ${
// //         valid ? "text-green-600" : "text-muted-foreground"
// //       }`}
// //     >
// //       {valid ? <Check size={14} /> : <X size={14} />}
// //       <span>{children}</span>
// //     </div>
// //   );

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
//               Better care starts with better organization.
//             </h1>

//             <p className="text-lg leading-8 text-slate-600">
//               Create your account to manage doctor information and keep your
//               healthcare workflow organized.
//             </p>
//           </div>

//           <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
//             <div className="flex items-center gap-3">
//               <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
//                 <UserRound size={24} />
//               </div>

//               <div>
//                 <p className="font-semibold text-slate-900">
//                   Your workspace, organized
//                 </p>
//                 <p className="text-sm text-slate-600">
//                   Keep your doctor records in one place.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Signup form */}
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
//                 Create your account
//               </CardTitle>

//               <CardDescription>
//                 Enter your details to get started.
//               </CardDescription>
//             </CardHeader>

//             <CardContent className="space-y-5">
//               {error && (
//                 <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
//                   <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
//                   <p>{error}</p>
//                 </div>
//               )}

//               <form onSubmit={handleSignUp} className="space-y-4">
//                 {/* Name */}
//                 <div className="space-y-2">
//                   <Label htmlFor="name">Full name</Label>

//                   <div className="relative">
//                     <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

//                     <Input
//                       id="name"
//                       type="text"
//                       placeholder="Your full name"
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}
//                       className="pl-10"
//                       autoComplete="name"
//                       required
//                     />
//                   </div>

//                   {submitted && !nameValid && (
//                     <p className="text-xs text-red-500">
//                       Name must be at least 3 characters.
//                     </p>
//                   )}
//                 </div>

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

//                 {/* Optional image URL */}
//                 <div className="space-y-2">
//                   <Label htmlFor="image">
//                     Profile image URL{" "}
//                     <span className="text-muted-foreground">(optional)</span>
//                   </Label>

//                   <div className="relative">
//                     <ImageIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

//                     <Input
//                       id="image"
//                       type="url"
//                       placeholder="https://example.com/image.png"
//                       value={image}
//                       onChange={(e) => setImage(e.target.value)}
//                       className="pl-10"
//                     />
//                   </div>

//                   {submitted && !imageValid && (
//                     <p className="text-xs text-red-500">
//                       Please enter a valid image URL.
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
//                       placeholder="Create a password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       className="pl-10 pr-10"
//                       autoComplete="new-password"
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

//                   <div className="space-y-1 pt-1">
//                     <Requirement valid={passwordValid}>
//                       At least 8 characters
//                     </Requirement>

//                     <Requirement valid={uppercaseValid}>
//                       At least one uppercase letter
//                     </Requirement>

//                     <Requirement valid={lowercaseValid}>
//                       At least one lowercase letter
//                     </Requirement>
//                   </div>
//                 </div>

//                 <Button
//                   type="submit"
//                   className="w-full bg-blue-600 hover:bg-blue-700"
//                   disabled={loading || googleLoading}
//                 >
//                   {loading ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Creating account...
//                     </>
//                   ) : (
//                     <>
//                       Create account
//                       <ArrowRight className="ml-2 h-4 w-4" />
//                     </>
//                   )}
//                 </Button>
//               </form>

//               <div className="relative">
//                 <Separator />
//                 <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-slate-500">
//                   OR CONTINUE WITH
//                 </span>
//               </div>

//               {/* github signin */}

//               <Button
//   type="button"
//   variant="outline"
//   className="w-full"
//   onClick={handleGitHubSignUp}
//   disabled={loading || googleLoading}
// >
//   {googleLoading ? (
//     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//   ) : (
//     <svg
//       className="mr-2 h-4 w-4"
//       viewBox="0 0 24 24"
//       fill="currentColor"
//       aria-hidden="true"
//     >
//       <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.42-4.04-1.42-.55-1.4-1.33-1.77-1.33-1.77-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.62-2.8 5.64-5.48 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
//     </svg>
//   )}

//   Continue with GitHub
// </Button>

//               {/* Google sign-up with inline SVG */}
//               {/* <Button
//                 type="button"
//                 variant="outline"
//                 className="w-full"
//                 onClick={handleGoogleSignUp}
//                 disabled={loading || googleLoading}
//               >
//                 {googleLoading ? (
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 ) : (
//                   <svg
//                     className="mr-2 h-4 w-4"
//                     viewBox="0 0 48 48"
//                     aria-hidden="true"
//                   >
//                     <path
//                       fill="#EA4335"
//                       d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
//                     />
//                     <path
//                       fill="#4285F4"
//                       d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 37.96 46.98 31.82 46.98 24.55Z"
//                     />
//                     <path
//                       fill="#FBBC05"
//                       d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z"
//                     />
//                     <path
//                       fill="#34A853"
//                       d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
//                     />
//                   </svg>
//                 )}

//                 Continue with Google
//               </Button> */}

//               <p className="text-center text-sm text-slate-600">
//                 Already have an account?{" "}
//                 <Link
//                   href="/sign-in"
//                   className="font-semibold text-blue-600 hover:text-blue-700"
//                 >
//                   Sign in
//                 </Link>
//               </p>
//             </CardContent>
//           </Card>

//           <p className="mt-5 text-center text-xs text-slate-500">
//             By creating an account, you agree to our terms and privacy policy.
//           </p>
//         </section>
//       </div>
//     </main>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent, ReactNode } from "react";
import {
  HeartHandshake,
  UserRound,
  Mail,
  LockKeyhole,
  Image as ImageIcon,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  X,
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

function Requirement({
  valid,
  children,
}: {
  valid: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`flex items-center gap-2 text-xs ${
        valid ? "text-green-600" : "text-muted-foreground"
      }`}
    >
      {valid ? <Check size={14} /> : <X size={14} />}
      <span>{children}</span>
    </div>
  );
}

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const nameValid = name.trim().length >= 3;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const passwordValid = password.length >= 8;
  const uppercaseValid = /[A-Z]/.test(password);
  const lowercaseValid = /[a-z]/.test(password);

  const imageValid =
    image.trim() === "" ||
    (() => {
      try {
        const url = new URL(image.trim());
        return url.protocol === "http:" || url.protocol === "https:";
      } catch {
        return false;
      }
    })();

  const formValid =
    nameValid &&
    emailValid &&
    passwordValid &&
    uppercaseValid &&
    lowercaseValid &&
    imageValid;

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitted(true);
    setError("");

    if (!formValid) {
      setError("Please check your information and try again.");
      return;
    }

    setLoading(true);

    try {
      const { error: signUpError } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        image: image.trim() || undefined,
        callbackURL: "/dashboard",
      });

      if (signUpError) {
        setError(signUpError.message || "Unable to create your account.");
        return;
      }

      router.replace("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubSignUp = async () => {
    setError("");
    setGithubLoading(true);

    try {
      const { error: githubError } = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/dashboard",
      });

      if (githubError) {
        setError(githubError.message || "GitHub sign-up failed.");
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
              Better care starts with better organization.
            </h1>

            <p className="text-lg leading-8 text-slate-600">
              Create your account to manage doctor information and keep your
              healthcare workflow organized.
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                <UserRound size={24} />
              </div>

              <div>
                <p className="font-semibold text-slate-900">
                  Your workspace, organized
                </p>
                <p className="text-sm text-slate-600">
                  Keep your doctor records in one place.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Signup form */}
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
                Create your account
              </CardTitle>

              <CardDescription>
                Enter your details to get started.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              {error && (
                <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <form onSubmit={handleSignUp} className="space-y-4">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>

                  <div className="relative">
                    <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <Input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10"
                      autoComplete="name"
                      required
                    />
                  </div>

                  {submitted && !nameValid && (
                    <p className="text-xs text-red-500">
                      Name must be at least 3 characters.
                    </p>
                  )}
                </div>

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

                {/* Optional profile image */}
                <div className="space-y-2">
                  <Label htmlFor="image">
                    Profile image URL{" "}
                    <span className="text-muted-foreground">(optional)</span>
                  </Label>

                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <Input
                      id="image"
                      type="url"
                      placeholder="https://example.com/image.png"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {submitted && !imageValid && (
                    <p className="text-xs text-red-500">
                      Please enter a valid image URL.
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
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      autoComplete="new-password"
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

                  <div className="space-y-1 pt-1">
                    <Requirement valid={passwordValid}>
                      At least 8 characters
                    </Requirement>

                    <Requirement valid={uppercaseValid}>
                      At least one uppercase letter
                    </Requirement>

                    <Requirement valid={lowercaseValid}>
                      At least one lowercase letter
                    </Requirement>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={loading || githubLoading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="relative">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-slate-500">
                  OR CONTINUE WITH
                </span>
              </div>

              {/* GitHub signup */}
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGitHubSignUp}
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

              <p className="text-center text-sm text-slate-600">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  Sign in
                </Link>
              </p>
            </CardContent>
          </Card>

          <p className="mt-5 text-center text-xs text-slate-500">
            By creating an account, you agree to our terms and privacy policy.
          </p>
        </section>
      </div>
    </main>
  );
}
