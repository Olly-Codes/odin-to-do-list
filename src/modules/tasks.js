class Task {
    constructor(title, description, dueDate, priority, status) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
    }

    getTaskDetails() {
        return {
            title: this.title,
            description: this.description,
            dueDate: this.dueDate,
            priority: this.priority,
            status: this.status
        }
    }

    toggleStatus() {
        this.status = !this.status;
    }
}

export default Task;