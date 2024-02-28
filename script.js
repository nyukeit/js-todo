const inputAdd = document.getElementById("inputAdd")
const buttonAdd = document.getElementById("buttonAdd")
const list0 = document.getElementById("list0");
const list1 = document.getElementById("list1");
const list2 = document.getElementById("list2");
const newDay = new Date();
const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
}
const today = newDay.toLocaleDateString('fr-FR', options);
const dateBalise = document.querySelector("#date");
console.log(today);
dateBalise.innerText = today;

//const array_todolist = [];
// Local Storage 
const readMemory = () => {
    const data = localStorage.getItem("todoList");
    if(data === null) {
        return [];
    } else {
        console.log(JSON.parse(data));
        return JSON.parse(data);
    }
}
const refreshMemory = (array_todolist)=> {
    localStorage.removeItem("todoList");
    localStorage.setItem("todoList", JSON.stringify(array_todolist));
}
let array_todolist = readMemory();
const alertUnchanted = (message) => {
    const messageZone = document.getElementById('alert_message');
    messageZone.textContent = message;
}

const record = () => {
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: "2-digit", 
        minute: "2-digit"
    }
    const today = newDay.toLocaleDateString('fr-FR', options);
    const value = inputAdd.value;
    if(value != '') {
        const id =  array_todolist.length + 1;
        const constructObject = {id: id, date: today, description: value, check: false, status: 0};
        array_todolist.push(constructObject);
        alertUnchanted('');
        refreshMemory(array_todolist);
 
    } else {
        alertUnchanted("Please type a task !")
    }

}

const display = () => {
    array_todolist = readMemory();
    
    // effacer toute la todolist
    const lastList = document.querySelectorAll('li');
   

    for (let index = 0; index < lastList.length; index++) {
        lastList[index].remove();
    }

    for(let i=0; i<array_todolist.length; i++){
        
        const description = array_todolist[i].description
        const date = array_todolist[i].date
        const displayList = document.createElement("li")
        const checkBox =  document.createElement('input');
        checkBox.setAttribute('type', 'checkbox');
        checkBox.checked = array_todolist[i].check;
        checkBox.addEventListener('click',()=>{
            //const check = array_todolist[i].check === true && array_todolist[i].status === 0 ? array_todolist[i].check = false : array_todolist[i].check = true;
            array_todolist[i].check === true && array_todolist[i].status === 0 ? array_todolist[i].check = false : array_todolist[i].check = true;
            let statusChange = array_todolist[i].status;
            array_todolist[i].status = ++statusChange;
            if(statusChange >2) {
                array_todolist.splice(i, 1);
                console.log(array_todolist);
            }
            refreshMemory(array_todolist);
            display();
        });
    
        const textBox = document.createElement('p');
        if(array_todolist[i].check) {
            textBox.setAttribute('class', 'checkedLine');
        }
        textBox.innerHTML = `${description} le ${date}`;
        const delButton = document.createElement("i");
        delButton.setAttribute("value", i);
        delButton.setAttribute("class", "fa-solid fa-trash delButton");
        delButton.addEventListener('click', ()=>{
            console.log(i)
            array_todolist.splice(i, 1);
            console.log(array_todolist);
            refreshMemory(array_todolist);
            display();
            
            })
            // Affichage
        displayList.appendChild(checkBox);
        displayList.appendChild(textBox);  
        displayList.appendChild(delButton);

        if (array_todolist[i].status === 0) {

            list0.appendChild(displayList);
        } else if (array_todolist[i].status === 1) {

            list1.appendChild(displayList);
        } else if (array_todolist[i].status === 2){
           
            list2.appendChild(displayList);
        }     
    }

}
display();
// Data Record
buttonAdd.addEventListener("click", () => {
    const message = record();
    display();
 
    // displayToDoList();
    inputAdd.value = "";
  
});
