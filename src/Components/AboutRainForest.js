import React from "react";
import Slide from "react-reveal/Slide";
import CountUp from "react-countup";

const backgroundStyle = {
  backgroundImage: `url(https://raw.githubusercontent.com/greco-paro-association/shared-hosting/master/images/bg/about_forest.jpg)`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  minHeight: "400px",
  fontFamily: "Nunito, sans-serif",
};

const manualOpacity = {
  backgroundColor: "black",
  opacity: "0.5",
  position: "absolute",
  width: "100%",
  height: "100%",
  top: "0px",
};

const AboutRainForest = () => {
  return (
    <div style={backgroundStyle} className="no-margin">
      <div style={manualOpacity}></div>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-8 offset-sm-4 mt5">
            <h2
              className="f1 card-title text-white"
              style={{
                paddingBottom: "35px",
              }}
            >
              Saving Rainforests
            </h2>
          </div>
        </div>
        <div className="row">
          <Slide left>
            <div className="col-xs-12 col-sm-4 center">
              <div style={{ color: "white", margin: "auto" }}>
                <div className="center">
                  <i aria-hidden="true" className="fa fa-tree fa-4x"></i>
                </div>
                <p className="mb-0 mt2 f1">
                  <CountUp end={100} duration={5}></CountUp>
                </p>
                <p className="text-white">Trees Planted</p>
              </div>
              <div style={{ color: "white", margin: "auto" }}>
                <div className="center">
                  <i aria-hidden="true" className="fa fa-map fa-4x"></i>
                </div>
                <p className="mb-0 mt2 f1">
                  <CountUp end={2} duration={1}></CountUp>
                </p>
                <p className="text-white">Acres Saved</p>
              </div>
            </div>
          </Slide>
          <Slide right>
            <div className="col-xs-12 col-sm-8">
              <p className="f4" style={{ color: "white" }}>
                Rainforests are Earth’s lungs and we simply cannot afford to
                lose them. We are partnering with the Rainforest Trust to
                protect our biodiverse rainforests, prevent deforestation, and
                decrease global emissions..
              </p>
              <p className="f4" style={{ color: "white" }}>
                By using our flight finder, you can now help save rainforests
                and reduce your impact on climate change. Forests absorb 30% of
                our carbon dioxide emissions, are home to 90% of the world's
                terrestrial biodiversity, but now cover only 6% of the planet.
              </p>
              <p className="f4" style={{ color: "white" }}>
                Nearly 70,000 acres of tropical forest are lost every day in
                fires and loggings, further threatening critically endangered
                species, for mining and agricultural purposes. Tropical
                deforestation accounts for up to 15% of net global carbon
                emissions each year. That is equivalent to every car, truck,
                bus, plane, ship and train on the planet combined.
              </p>
              <p className="f4" style={{ color: "white" }}>
                We must act now. Halting tropical deforestation and allowing for
                regrowth could mitigate up to 50% of net global emissions
                through 2050.
              </p>
            </div>
          </Slide>
        </div>
      </div>
    </div>
  );
};

export default AboutRainForest;
