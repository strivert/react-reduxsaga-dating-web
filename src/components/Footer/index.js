import React from 'react';

const Footer = () => 
  <footer className="footer">
    <div className="footer-wrapper">
	    <ul className="footer__nav" role="navigation">
        <li><a href="https://www.catholicsingles.com/moreaboutus/">Why Join us?</a></li>
        <li><a href="https://www.catholicsingles.com/how-it-works/">How It works</a></li>
	    </ul>
	    <ul className="footer__nav" role="navigation">
        <li><a href="https://www.catholicsingles.com/testimonials/">Success Stories</a></li>
        <li><a href="https://www.catholicsingles.com/blog/">Blog</a></li>
        <li><a href="https://www.catholicsingles.com/advertising/">Advertise</a></li>
	    </ul>

	    <hr />

	    <div className="footer__copyright">
		    <p>Copyright &copy; 2017 Catholic Singles</p> <span>-</span>
		    <ul>
          <li><a href="https://www.catholicsingles.com/privacy-policy/">Privacy Policy</a></li>
			    <li><a href=""> Terms & Conditions</a></li>
		    </ul>
	    </div>
	    <div className="footer__social">
        <a href="https://www.facebook.com/catholicsingle://www.facebook.com/catholicsingles"><i className="fa fa-facebook fa-lg"></i></a>
        <a href="https://twitter.com/CatholicSingles"><i className="fa fa-twitter fa-lg"></i></a>
	    </div>
    </div>
  </footer>

export default Footer;
