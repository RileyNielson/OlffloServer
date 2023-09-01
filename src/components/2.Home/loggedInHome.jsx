import React from "react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { useNavigate } from "react-router-dom";
import newProject from "../newProject.js";

function LoggedInHome(props) {
  const navigate = useNavigate();

  function GoToApp(projID) {
    async function fetchProject() {
      const response = await fetch(`http://olffloapi.onrender.com/projects/${projID}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const project = await response.json();

      if (!project) {
        window.alert(`Record with id ${projID} not found`);
        return;
      }

      props.setProject(() => {
        navigate("/olffloApp");
        return project;
      });
    }

    async function createProject() {
      const createResponse = await fetch("http://olffloapi.onrender.com/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      }).catch((error) => {
        window.alert(error);
        return;
      });

      const id = await createResponse.json();

      const newUserProject = {
        title: newProject.title,
        _id: id.insertedId,
        image: newProject.image,
      };

      const newProjectwithId = {
        title: newProject.title,
        _id: id.insertedId,
        items: [
          {
            key: crypto.randomUUID(),
            id: 1,
            title: "Step 1",
            feeds: [],
            coords: [],
            subItems: [],
          },
        ],
        image: newProject.image,
      };

      console.log(newProject.items);

      const updatedUser =
        props.user.projects.length > 0
          ? {
              ...props.user,
              projects: [...props.user.projects, newUserProject],
            }
          : { ...props.user, projects: [newUserProject] };

      props.setUser(() => {
        return updatedUser;
      });

      // This will send a post request to update the data in the database.
      await fetch(`http://olffloapi.onrender.com/users/${props.user._id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedUser),
        headers: {
          "Content-Type": "application/json",
        },
      });

      props.setProject(() => {
        navigate("/olffloApp");
        return newProjectwithId;
      });
    }

    if (projID !== "New Project") {
      fetchProject();
    } else {
      createProject();
    }
  }

  function handleHorizontalScroll(element, step) {
    let scrollAmount = 150;
    const slideTimer = setInterval(() => {
      element.scrollLeft += step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= element.offsetWidth * 1.4) {
        clearInterval(slideTimer);
      }
      if (element.scrollLeft <= 0) {
        document.getElementById("leftArrow").classList.add("disableButton");
        document.getElementById("rightArrow").classList.remove("disableButton");
      } else if (
        element.scrollLeft >=
        element.scrollWidth - element.clientWidth
      ) {
        document.getElementById("leftArrow").classList.remove("disableButton");
        document.getElementById("rightArrow").classList.add("disableButton");
      } else {
        document.getElementById("leftArrow").classList.remove("disableButton");
        document.getElementById("rightArrow").classList.remove("disableButton");
      }
    }, 5);
  }

  return (
    <div id="homeBody">
      <div id="homeTitle">
        <h1>Welcome {props.user.userName}</h1>
      </div>
      <h3>Choose a project to work on:</h3>
      <div id="homeCarousel">
        <div
          id="leftArrow"
          className="carouselButton leftButton disableButton"
          onClick={() => {
            handleHorizontalScroll(document.getElementById("carousel"), -10);
          }}
        >
          <ArrowCircleLeftIcon fontSize="large" />
        </div>
        <div id="carousel">
          {Array.isArray(props.user.projects) &&
            props.user.projects.map((proj) => (
              <div
                className="homePic"
                style={{ backgroundColor: "white" }}
                onClick={() => {
                  GoToApp(proj._id);
                }}
              >
                <p>{proj.title}</p>
                <img
                  className="projectThumbnail"
                  src={proj.image}
                  alt={proj.title}
                />
              </div>
            ))}
          <div
            className="homePic"
            style={{ backgroundColor: "white" }}
            onClick={() => {
              GoToApp("New Project");
            }}
          >
            Start New Project...
          </div>
        </div>
        <div
          id="rightArrow"
          className="carouselButton rightButton"
          onClick={() => {
            handleHorizontalScroll(document.getElementById("carousel"), 10);
          }}
        >
          <ArrowCircleRightIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
}

export default LoggedInHome;
