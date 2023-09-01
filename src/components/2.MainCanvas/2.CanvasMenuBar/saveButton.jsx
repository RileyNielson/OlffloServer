import React from "react";

function SaveButton(props) {
  async function saveProject(e) {
    e.preventDefault();
    const imageURL = props.canvasRef.current.toDataURL();

    props.setProject({ ...props.project, image: props.imageURL });

    // This will send a post request to update the data in the database.
    const response = await fetch(
      `http://olffloapi.onrender.com/projects/${props.project._id}`,
      {
        method: "PATCH",
        body: JSON.stringify({ ...props.project, image: imageURL }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const updateProject = props.user.projects.map((p, index) => {
      if ((p._id === props.project._id)) {
        return {
          ...p,
          image: imageURL,
        };
      } else {
        return { ...p };
      }
    });

    props.setUser({
      ...props.user,
      projects: updateProject,
    });

    // This will send a post request to update the data in the database.
    await fetch(`http://olffloapi.onrender.com/users/${props.user._id}`, {
      method: "PATCH",
      body: JSON.stringify({
        ...props.user,
        projects: updateProject,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <div id="saveButton" onClick={saveProject}>
      Save
    </div>
  );
}

export default SaveButton;
