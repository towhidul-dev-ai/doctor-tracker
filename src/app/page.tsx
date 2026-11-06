
import Analytics from "./components/home/analytics";
import CTA from "./components/home/cta";
import DashboardPreview from "./components/home/dashboard-preview";
import Features from "./components/home/features";
import Hero from "./components/home/hero";
import Workflow from "./components/home/workflow";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/NavBar";



export default function HomePage() {
  return (
    <>
    <Navbar></Navbar>
    <main className="overflow-hidden">
      <Hero></Hero>
      <DashboardPreview></DashboardPreview>
      <Features></Features>
      <Analytics></Analytics>
      <Workflow></Workflow>
      <CTA></CTA>
    </main>
    <Footer></Footer>
    </>
  );
}
