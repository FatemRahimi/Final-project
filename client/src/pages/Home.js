import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faLinkedin,
	faFacebook,
	faTwitter,
	faInstagram,
	faGithub,
} from "@fortawesome/free-brands-svg-icons";
import logo from "./images/cyf_brand.png";
import githubLogo from "./github-mark-white.png";
import  photo from "./photo.jpg";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

export function Home() {
const githubLoginUrl = "https://github.com/login/oauth/authorize";
	const client_id = process.env.CLIENT_ID;
    const redirect_uri = process.env.REDIRECT_URI;
    const state = process.env.CLIENT_KEY;
    const url = `${githubLoginUrl}?client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}`;

return (
	<>
		<img src={logo} alt="logo" className="cyf-lg" />
		<main className="main-login" role="main">
			<>
				<div className="login_wrapper">
					<div className="text-flicker-in-glow">
							<ul className="star-h4">
								<li>
									<b>S</b>ituation
								</li>
								<li>
									<b>T</b>ask
								</li>
								<li>
									<b>A</b>ction
								</li>
								<li>
									<b>R</b>esult
								</li>
							</ul>
					</div>
					<div className="login_git">
						<h2 className="header">WELCOME TO</h2>
						<h1 className="login_git-h1">STAR</h1>
						<Link to={url} className="link">
							<button className="git_btn">
								{" "}
								Sign in with
								<img src={githubLogo} alt="github-logo" className="git-logo" />
							</button>
						</Link>
					</div>
				</div>
			</>
			<div className="about-wrapper">
				<h1 className="head">What is STAR?</h1>
				<article className="STAR">
					<section className="situation">
						<h4 className="situation-h4">Situation</h4>
						<p>Set the scene and give the necessary details of your example.</p>
					</section>
					<section className="task">
						<h4 className="task-h4">Task</h4>
						<p>Describe what your responsibility was in that situation.</p>
					</section>
					<section className="action">
						<h4 className="action-h4">Actions</h4>
						<p>Explain exactly what steps you took to address it.</p>
					</section>
					<section className="result">
						<h4 className="result-h4">Result</h4>
						<p>Share what outcomes your actions achieved.</p>
					</section>
				</article>

				<article className="about">
					<h3 className="about-h3">About the App</h3>
					<section className="video">
						<div className="about-p">
							<p>
								This app helps you keep track of your progress and skills. It's
								like a map of your experiences that you can use when applying for
								jobs. You can reflect on what you did during the week, talk about
								what you accomplished, and what challenges you faced. By doing
								this, you'll be able to see how far you've come and what you've
								achieved, with specific examples to show potential employers.
							</p>
							<br />
							<p>
								Moreover, this app ensures that your learning is never overlooked.
								Even if what you learned is not directly related to your goals,
								you can still track it and see the extra tasks you accomplished.
								This includes invisible work, such as the additional hours you
								spent learning a new concept.
							</p>
							<br />
							<p>
								* To learn more about the importance of highlighting your
								achievements, please watch the video{" "}
								<a href="https://www.youtube.com/watch?v=XoBrMpH0Vz8&list=RDCMUCoyqucxoFXDFnh3khD0rjUg&start_radio=1&rv=XoBrMpH0Vz8&t=45">
									by Gargi Sharma
								</a>
								, which discusses the importance of "bragging" about yourself and
								celebrating your successes.
							</p>
						</div>
						<div className="use">
							<div className="try">
								<img src={photo} alt="students" className="image-S" />
							</div>
							<h3 className="use-h3">How to use the STAR APP</h3>
							<ul className="use-p">
								<li>Fill out the form to add your Stars</li>
								<li>
									Easily make changes by clicking the Edit button and saving it
								</li>
								<li>Search for your Stars using the Search field</li>
								<li>
									Find comments from your TA or Mentor in the Comment section.
								</li>
							</ul>
						</div>
					</section>
				</article>
			</div>
			<footer>
				<div className="social-container">
					<p className="copy-p">Copyright &copy; 2023</p>
					<p className="social-p">Follow us</p>
					<div className="icon-div">
						<a
							href="https://www.linkedin.com/company/15224414/admin/"
							className="iconS"
						>
							<FontAwesomeIcon icon={faLinkedin} size="2x" />
						</a>
						<a
							href="https://www.facebook.com/codeyourfuture.io"
							className="iconS"
						>
							<FontAwesomeIcon icon={faFacebook} size="2x" />
						</a>
						<a href="https://twitter.com/CodeYourFuture" className="iconS">
							<FontAwesomeIcon icon={faTwitter} size="2x" />
						</a>
						<a
							href="https://www.instagram.com/codeyourfuture_/"
							className="iconS"
						>
							<FontAwesomeIcon icon={faInstagram} size="2x" />
						</a>
						<a href="https://github.com/CodeYourFuture" className="iconS">
							<FontAwesomeIcon icon={faGithub} size="2x" />
						</a>
						<a href="jk" className="iconS">
							<FontAwesomeIcon icon={faEnvelope} size="2x" />
						</a>
					</div>
				</div>
			</footer>
		</main>
	</>
);
}

export default Home;
