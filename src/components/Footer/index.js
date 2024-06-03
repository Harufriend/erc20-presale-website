import { SocialItemContents } from "configs/UI"

import "./style.scss"

const Footer = () => (
  <div className="footer flex">
    <div className="footer-wrapper container flex-column">
      <div className="footer-community flex rounded shadowed">
        <div className="flex-column">
          <span>Join IMP Community</span>
          <p>Follow us in all major social networks around the world</p>
        </div>
        <button className="rounded shadowed">create account</button>
      </div>

      <div className="footer-main grid">
        <div className="footer-main-about">
          <span>About IMP</span>
          <p></p>
        </div>

        <div className="footer-main-links">
          <span>Useful Links</span>
          <div className="flex-column">
            <a href="">Why a IMP ICO?</a>
            <a href="">Whitepaper</a>
            <a href="">Roadmap</a>
            <a href="">Architecture</a>
            <a href="">About</a>
          </div>
        </div>

        <div className="footer-main-follow">
          <span>Follow Us</span>
          <p></p>
          <div className="flex">
            {SocialItemContents.map((data, index) => (
              <a key={index} href={data.link}>
                {data.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <span>© 2022 IMP Inc - All rights reserved.</span>
    </div>
  </div>
)

export default Footer
