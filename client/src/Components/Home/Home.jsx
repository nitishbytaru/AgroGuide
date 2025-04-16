import {
  FAQ,
  Features,
  Hero,
  Service,
  YouTube,
} from "./SubHome/index.js";

function Home() {
  return (
    <div className="container">
      {/* <!-- Hero Section --> */}
      <Hero />

      {/* <!-- Services Section --> */}
      <Service />

      {/* <!-- Features Section --> */}
      <Features />

      {/* <!-- YouTube Video Section --> */}
      <YouTube />

      {/* <!-- FAQ Section --> */}
      <FAQ />

    </div>
  );
}

export default Home;
