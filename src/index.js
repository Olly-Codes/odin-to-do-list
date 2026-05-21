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
    const currentProject = appController.getCurrentProject();
    const mainContainer = document.querySelector("#container");

    const projectList = document.createElement("ul");
    projectList.classList.add("project-list");

    const taskList = document.createElement("ul");
    taskList.classList.add("task-list");

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
            const projectItem = document.createElement("li");
            projectItem.dataset.id = project.id;
            projectItem.textContent = project.title;

            projectList.appendChild(projectItem);
            sideBar.appendChild(projectList);
        });
    }

    const updateContentDiv = () => {
        contentDiv.textContent = "";

        const projectTasks = currentProject.taskList;
        if (!projectTasks.length) {
            taskList.textContent = "No tasks added yet";
            contentDiv.appendChild(taskList);
            return;
        }

        for (const task of projectTasks) {
            const taskItem = document.createElement("li");
            taskItem.dataset.id = task.id;

            const taskCard = document.createElement("div");
            taskCard.classList.add("task-card");

            const taskTitle = document.createElement("h1");
            taskTitle.textContent = task.title;

            const taskDescription = document.createElement("div");
            taskDescription.textContent = task.description;

            const taskDate = document.createElement("p");
            taskDate.textContent = task.dueDate;

            const taskPriority = document.createElement("p");
            taskPriority.textContent = task.priority;

            const taskStatusWrapper = document.createElement("div");
            taskStatusWrapper.classList.add("status-wrapper");

            const taskStatusText = document.createElement("p");
            taskStatusText.textContent = "Done: ";

            const taskStatus = document.createElement("input");
            taskStatus.type = "checkbox";
            taskStatus.checked = task.status;

            taskStatusWrapper.appendChild(taskStatusText);
            taskStatusWrapper.appendChild(taskStatus);

            taskCard.appendChild(taskTitle);
            taskCard.appendChild(taskDescription);
            taskCard.appendChild(taskDate);
            taskCard.appendChild(taskPriority);
            taskCard.appendChild(taskNotes);
            taskCard.appendChild(taskStatusWrapper);

            taskItem.appendChild(taskCard);
            contentDiv.appendChild(taskItem);
        }
        
    }

    updateSideBar();
    updateContentDiv();
})();