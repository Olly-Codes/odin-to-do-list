import Task from "./modules/tasks.js";
import Project from "./modules/projects.js";

const appController = (() => {
    const projects = [new Project()];
    let currentProject = projects[0];

    const getProjects = () => projects;

    const getCurrentProject = () => currentProject;

    const switchProject = (projectId) => {
        for (const project of projects) {
            if (project.id === projectId) {
                currentProject = project;
            }
        }
    }

    const addProject = (projectName) => {
        projects.push(new Project(projectName));
    }

    const addTask = ( 
        title, 
        description, 
        dueDate, 
        priority, 
        notes, 
        status
    ) => {
        const newTask = new Task( 
            title, 
            description, 
            dueDate, 
            priority, 
            notes, 
            status
        );

        currentProject.addTask(newTask);
    }

    return { 
        getProjects, 
        getCurrentProject, 
        addProject, 
        switchProject, 
        addTask 
    }
})();

const screenController = (() => {
    const app = appController;
    const mainContainer = document.querySelector("#container");

    const projectList = document.createElement("ul");
    projectList.classList.add("project-list");

    const sideBar = document.createElement("aside");
    sideBar.classList.add("side-bar");

    const contentDiv = document.createElement("div");
    contentDiv.classList.add("content");

    mainContainer.appendChild(sideBar);
    mainContainer.appendChild(contentDiv);

    const updateSideBar = () => {
        sideBar.textContent = "";

        const projects = app.getProjects();
        projects.forEach((project) => {
            const li = document.createElement("li");
            li.textContent = project.title;

            projectList.appendChild(li);
            sideBar.appendChild(projectList);
        });
    }

    updateSideBar();
})();