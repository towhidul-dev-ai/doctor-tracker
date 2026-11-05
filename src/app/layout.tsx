// import type { Metadata } from "next";
// import { Josefin_Sans } from "next/font/google";
// import "./globals.css";
// import NavBar from "./components/layout/NavBar";
// import Footer from "./components/layout/Footer";

// const josefinSans = Josefin_Sans({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });


// export const metadata: Metadata = {
//   title: "Doctor Tracker | Healthcare Management",
//   description: "A modern healthcare administration platform to manage doctors, patients, and medical analytics.",
// };

// export default function RootLayout({ children }: LayoutProps<"/">) {
//   return (
//     <html
//       lang="en"
//       className={` ${josefinSans.className} h-full antialiased`}
//     >
//     <body className="min-h-full flex flex-col">
//     <NavBar></NavBar>
//     {children}
//     <Footer></Footer>
//     </body>
//     </html>
//   );
// }


import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Doctor Tracker",
  description: "Doctor and patient management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
