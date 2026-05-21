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