import Task from "./modules/tasks.js";
import Project from "./modules/projects.js";
import taskModal from "./modules/taskModal.js";
import projectModal from "./modules/projectModal.js";

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
        status
    ) => {
        const newTask = new Task( 
            title, 
            description, 
            dueDate, 
            priority,  
            status
        );

        currentProject.addTask(newTask);
    }

    const deleteTask = (taskId) => {
        currentProject.deleteTask(taskId);
    }

    return { 
        getProjects, 
        getCurrentProject, 
        addProject, 
        switchProject, 
        addTask,
        deleteTask
    }
})();

const screenController = (() => {
    const app = appController;
    const mainContainer = document.querySelector("#container");

    const projectList = document.createElement("ul");
    projectList.classList.add("project-list");

    const taskList = document.createElement("ul");
    taskList.classList.add("task-list");

    const sideBar = document.createElement("aside");
    sideBar.classList.add("side-bar");

    const contentDiv = document.createElement("div");
    contentDiv.classList.add("content");

    const addProjectBtn = document.createElement("button");
    addProjectBtn.type = "button";
    addProjectBtn.textContent = "Add Project";
    
    const addTaskBtn = document.createElement("button");
    addTaskBtn.type = "button";
    addTaskBtn.textContent = "Add Task";

    mainContainer.appendChild(taskModal);
    mainContainer.appendChild(projectModal);
    mainContainer.appendChild(sideBar);
    mainContainer.appendChild(contentDiv);

    function handleAddProject() {
        projectModal.showModal();
        return;
        app.addProject(projectTitle);
        
    }

    projectModal.querySelector("#closeProjectModalBtn").addEventListener("click", () => {
        projectModal.close();
    });

    projectModal.querySelector("#projectForm").addEventListener("submit", (e) => {
        const title = document.querySelector("#newProjectTitle").value;

        app.addProject(title);
        e.target.reset();
        updateSideBar();
    });

    function handleAddTask() {
        taskModal.showModal();
        return;
    }

    taskModal.querySelector("#closeModalBtn").addEventListener("click", () => {
        taskModal.close();
    });

    taskModal.querySelector("#taskForm").addEventListener("submit", (e) => {
        const title = document.querySelector("#newTaskTitle").value;
        const description = document.querySelector("#newTaskDesc").value;
        const dueDate = document.querySelector("#newTaskDate").value;
        const priority = document.querySelector("#newTaskPriority").value;
        const status = false;

        app.addTask(title, description, dueDate, priority, status);
        e.target.reset();
        updateContentDiv();
    });

    function handleProjectSwitch(projectId) {
        app.switchProject(projectId);
        updateSideBar();
        updateContentDiv();
        return;
    }

    function handleDeleteTask(taskId) {
        app.deleteTask(taskId);
        updateSideBar();
        updateContentDiv();
        return;
    }

    const updateSideBar = () => {
        sideBar.textContent = "";
        projectList.textContent = "";

        const projects = app.getProjects();
        projects.forEach((project) => {
            const projectItem = document.createElement("li");
            projectItem.dataset.id = project.id;
            projectItem.textContent = project.title;

            projectList.appendChild(projectItem);
            sideBar.appendChild(projectList);

            projectItem.addEventListener("click", (project) => {
                handleProjectSwitch(project.target.dataset.id)
            });
        });

        sideBar.appendChild(addProjectBtn);
    }

    const updateContentDiv = () => {
        contentDiv.textContent = "";
        taskList.textContent = "";
        contentDiv.appendChild(addTaskBtn);

        const projectTasks = app.getCurrentProject().taskList;
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

            const deleteTaskBtn = document.createElement("button");
            deleteTaskBtn.type = "button";
            deleteTaskBtn.textContent = "Delete Task";

            taskStatusWrapper.appendChild(taskStatusText);
            taskStatusWrapper.appendChild(taskStatus);

            taskCard.appendChild(taskTitle);
            taskCard.appendChild(taskDescription);
            taskCard.appendChild(taskDate);
            taskCard.appendChild(taskPriority);
            taskCard.appendChild(taskStatusWrapper);
            taskCard.appendChild(deleteTaskBtn);

            taskItem.appendChild(taskCard);

            taskList.appendChild(taskItem);

            deleteTaskBtn.addEventListener("click", () => {
                handleDeleteTask(taskItem.dataset.id);
            });

            taskStatus.addEventListener("change", () => {
                task.toggleStatus();
                console.log(`${task.title} status is now: ${task.status}`);
            });
        }
        contentDiv.appendChild(taskList);
    }

    addProjectBtn.addEventListener("click", handleAddProject);
    addTaskBtn.addEventListener("click", handleAddTask);

    updateSideBar();
    updateContentDiv();
})();