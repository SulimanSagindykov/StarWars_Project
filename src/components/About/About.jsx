import './About.css';

const About = () => {
    return(
        <div className="about-container">
                <div className="desc card">
                    <h1 className="about">About project:</h1>
                    <ul className="desc-list purple">
                        <li><h3>This is a project built in React and Django.</h3></li>
                        <li><h3>Gives info about the world of StarWars </h3></li>
                    </ul>
                </div>
                <div className="dev card">
                    <h1 className="about">About developer:</h1>
                    <ul className="desc-list center">
                        <h1 className="name">I am Suliman Sagindykov</h1>
                        <h2 className="purple goal">and I want to be a part of nFactorial family</h2>
                    </ul>
                </div>
        </div>
    )
}

export default About;