const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const taskList= document.querySelector('#taskList');
const emptyList = document.querySelector('#emptyList')
//Добавление задачи
form.addEventListener('submit',addTask);

//Удаление задачи
taskList.addEventListener('click', deleteTask)

if (localStorage.getItem('tasksHTML')){

    taskList.innerHTML = localStorage.getItem('tasksHTML');
}


//Добавление задачи
taskList.addEventListener('click', doneTask)


        function addTask(event){

     //Отмена отправки формы

     event.preventDefault();

     //Достаем текст из поля ввода
          const taskText = taskInput.value;

         const taskHtml = `
                 
                 <li class="list-group-item d-flex justify-content-between task-item">
                 <span class="task-title">${taskText}</span>
                 <div class="task-item__buttons">
                 <button type="button" data-action="done" class="btn-action">
                 <img src="./img/tick.svg" alt="Done" width="18" height="18">
                 </button>
                 <button type="button" data-action="delete" class="btn-action">
                 <img src="./img/cross.svg" alt="Done" width="18" height="18">
                 </button>
                 </div>
                 </li>`;
                 
                 taskList.insertAdjacentHTML('beforeend', taskHtml);

     //Очистка поля ввода

             taskInput.value = "";

             taskInput.focus();

     //Если в списке больше 1 элемента то мы скрываем информацию что список пуст

             if(taskList.children.length > 1){

                 emptyList.classList.add('none');

             }
             saveToLs();
            }

        function deleteTask(event){

            if(event.target.dataset.action !== 'delete') return;

             const parentNode = event.target.closest('li');
              parentNode.remove();

//Если в списке меньше 1 элемента то мы показываем информацию что список пуст
              if(taskList.children.length === 1) emptyList.classList.remove('none');   
              saveToLs();   
            }

        function doneTask(event){
            if(event.target.dataset.action !== 'done') return;

            const parentNode = event.target.closest('li');
            const taskTitle = parentNode.querySelector('span');
            taskTitle.classList.toggle('task-title--done');           
            saveToLs();
            }

        function saveToLs(){

            if(taskList.children.length === 1) emptyList.classList.remove('none');
             localStorage.setItem('tasksHTML', taskList.innerHTML);

            }         