import Task from "./tasks.js";
import Project from "./projects.js";

const storageKey = "to-do-list-projects";

const saveToStorage = (projectsArr) => {
    localStorage.setItem(storageKey, JSON.stringify(projectsArr));
};

const loadFromStorage = () => {
    const data = localStorage.getItem(storageKey);

    if (!data) return null;

    const parsedData = JSON.parse(data);

    return parsedData.map((projectData) => {
        const project = new Project(projectData.title);
        project.id = projectData.id;

        projectData.taskList.forEach((taskData) => {
            const task = new Task(
                taskData.title,
                taskData.description,
                taskData.dueDate,
                taskData.priority,
                taskData.status
            );
            task.id = taskData.id;
            project.addTask(task);
        });
        
        return project;
    });
}

export { saveToStorage, loadFromStorage };