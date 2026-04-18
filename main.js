const show = document.createElement("h1")
show.textContent ="I'm a task manager"
document.body.appendChild(show)

const input = document.createElement("input")
input.placeholder="What's your task for today?"
document.body.appendChild(input)

const Addbtn = document.createElement("button")
Addbtn.textContent= "Add"
document.body.appendChild(Addbtn)
Addbtn.id="Add"

const list=document.createElement("ul")
document.body.appendChild(list)

let taskList =[]
if(localStorage.getItem("taskList") !== null){
    taskList = JSON.parse(localStorage.getItem("taskList"))
}

const update = () => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
    render()};

Addbtn.onclick=()=>{
    if (input.value.trim() === "") return;
    addTask()
}

const addTask=()=>{
    taskList.push({
    text:input.value,
    completed: false ,
    })
    input.value =""
    update()
}

const deleteTask =(index)=>{
    taskList = taskList.filter((_, i) => i !== index);
    update()
}

const toggleTask = (index) =>{
    taskList[index].completed = !taskList[index].completed;
    update()
}

const render =()=>{
    list.innerHTML ="";
    taskList.forEach((task,index)=>{
        const listItem=document.createElement("li")
        listItem.textContent =task.text;
        if(task.completed){listItem.className="completedTask"}

        const Deletebtn =document.createElement("button");
        Deletebtn.innerText = "X";
        Deletebtn.className="Delete"
        Deletebtn.onclick=()=>{deleteTask(index)}
    
        const Completedbtn =document.createElement("button");
        Completedbtn.innerText = "✓";
        Completedbtn.onclick=()=>{toggleTask(index)};    

        listItem.appendChild(Completedbtn);
        listItem.appendChild(Deletebtn);

        list.appendChild(listItem)
    })
}

input.addEventListener('keyup',function(event) {
  if (event.key==="Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    if (input.value.trim() === "") return;
    addTask()}
})

document.addEventListener("DOMContentLoaded",render)
