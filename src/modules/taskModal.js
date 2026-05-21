const taskModal = document.createElement("dialog");

const priority = ["High", "Medium", "Low"];

const taskForm = document.createElement("form");
taskForm.method = "dialog";
taskForm.id = "taskForm";

const newTaskText = document.createElement("h2");
newTaskText.textContent = "New Task";

const newTaskInput = document.createElement("input");
newTaskInput.type = "text";
newTaskInput.id = "newTaskTitle"
newTaskInput.placeholder = "Title";
newTaskInput.required = true;

const newTaskTextArea = document.createElement("textarea");
newTaskTextArea.id = "newTaskDesc";
newTaskTextArea.placeholder = "Description";
newTaskTextArea.required = true;

const newTaskDateInput = document.createElement("input");
newTaskDateInput.type = "date";
newTaskDateInput.id = "newTaskDate";
newTaskDateInput.required = true;

const newTaskSelect = document.createElement("select");
newTaskSelect.id = "newTaskPriority";
priority.forEach((prior) => {
    const option = document.createElement("option");
    option.value = prior;
    option.textContent = prior;
    newTaskSelect.appendChild(option);
});

const buttonWrapper = document.createElement("div");

const cancelBtn = document.createElement("button");
cancelBtn.type = "button";
cancelBtn.id = "closeModalBtn";
cancelBtn.textContent = "Cancel";

const submitBtn = document.createElement("button");
submitBtn.type = "submit";
submitBtn.textContent = "Submit";

taskForm.appendChild(newTaskText);
taskForm.appendChild(newTaskInput);
taskForm.appendChild(newTaskTextArea);
taskForm.appendChild(newTaskDateInput);
taskForm.appendChild(newTaskSelect);

buttonWrapper.appendChild(submitBtn);
buttonWrapper.appendChild(cancelBtn);

taskForm.appendChild(newTaskSelect);
taskForm.appendChild(buttonWrapper);

taskModal.appendChild(taskForm);

export default taskModal;