import React from "react";
import Slide from "react-reveal/Slide";

const backgroundStyle = {
  backgroundImage: `url(https://raw.githubusercontent.com/greco-paro-association/shared-hosting/master/images/bg/how.to.jpg)`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  fontFamily: "Nunito, sans-serif",
};

const HowItWorks = () => {
  return (
    <div style={backgroundStyle} className="no-margin-HowItWorks">
      <div
        style={{
          backgroundColor: "black",
          opacity: "0.5",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      ></div>
      <div className="container mt5 pv5">
        <div className="row">
          <div className="col-xs-12 col-sm-8">
            <h2
              className="f1 pv4"
              style={{
                color: "white",
              }}
            >
              How Does It Work?
            </h2>
          </div>
        </div>
        <div className="row">
          <Slide left>
            <div className="col-xs-12 col-sm-6">
              <p className="f4" style={{ color: "white" }}>
                Our idea is so simple that you are bound to fall in love with
                it. Our extension replaces your default new tab page and
                includes cool features such as an improved layout and stunning
                background pictures. We place a couple banner advertisements in
                the corner and raise about 1/10 of a cent per tab. Although
                small, just think of how many tabs you open in a day, month, or
                year, and multiply that by everyone that has a browser! We're
                not joking when we say that making an impact has never been
                easier.
              </p>
              <div className="center">
                <a href="/add">
                  <button
                    className="ma4 btn btn-outline-primary pv3 bg1 bn br-pill f4"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: "600",
                      height: "55px",
                      width: "220px",
                    }}
                  >
                    <i className="fa f6 pb3 fa-arrow-circle-down">
                      <p className="dib f5 b pl2">Add to chrome</p>
                    </i>
                  </button>
                </a>
              </div>
            </div>
          </Slide>
          <Slide right>
            <div className="col-xs-12 col-sm-5">
              <img
                src="https://raw.githubusercontent.com/greco-paro-association/shared-hosting/master/images/macbook.png"
                alt="mac"
                className="grow"
              />
            </div>
          </Slide>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
