import Task from "./tasks.js";

class Project {
    constructor(title) {
        this.id = crypto.randomUUID();
        this.title = title || 'Todo';
        this.taskList = [];
    }

    addTask(task) {
        this.taskList.push(task);
    }

    deleteTask(taskId) {
        if (!this.taskList.length) {
            console.log("No tasks");
            return;
        }
        this.taskList = this.taskList.filter((task) => task.id !== taskId);
    }

    listTasks() {
        if (!this.taskList.length) {
            console.log("No tasks");
            return;
        }

        for (const task of this.taskList) {
            console.log(task);
        }
    }
}

export default Project;