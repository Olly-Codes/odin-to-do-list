const projectModal = document.createElement("dialog");

const priority = ["High", "Medium", "Low"];

const projectForm = document.createElement("form");
projectForm.method = "dialog";
projectForm.id = "projectForm";

const newProjectText = document.createElement("h2");
newProjectText.textContent = "New Project";

const newProjectInput = document.createElement("input");
newProjectInput.type = "text";
newProjectInput.id = "newProjectTitle"
newProjectInput.placeholder = "Project Title";
newProjectInput.required = true;

const buttonProjectWrapper = document.createElement("div");

const cancelProjectBtn = document.createElement("button");
cancelProjectBtn.type = "button";
cancelProjectBtn.id = "closeProjectModalBtn";
cancelProjectBtn.textContent = "Cancel";

const submitProjectBtn = document.createElement("button");
submitProjectBtn.type = "submit";
submitProjectBtn.textContent = "Submit";

projectForm.appendChild(newProjectText);
projectForm.appendChild(newProjectInput);

buttonProjectWrapper.appendChild(submitProjectBtn);
buttonProjectWrapper.appendChild(cancelProjectBtn);

projectForm.appendChild(buttonProjectWrapper);

projectModal.appendChild(projectForm);

export default projectModal;