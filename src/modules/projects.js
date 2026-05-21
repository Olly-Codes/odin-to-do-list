import Task from "./tasks.js";

class Project {
    constructor(title) {
        this.id = crypto.randomUUID();
        this.title = title || 'Todo';
        this.taskList = [];
    }

    addTask(id, title, description, dueDate, priority, notes, status) {
        const newTask = new Task(
            id,
            title,
            description,
            dueDate,
            priority,
            notes,
            status
        );
        this.taskList.push(newTask);
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