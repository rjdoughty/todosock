
$( function(){

    const socket = io();
    const addday = function () {
        const d = new Date(),
        days = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
        const day = days[d.getDay()]
        $('#day').html(day);
        console.log(day);
    }
    $(document).ready(addday);
    
    const adddate = function () {
        const d = new Date(),
        months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
        const date = months[d.getMonth()]+' '+d.getDate()+' '+d.getFullYear()
        $('#date').html(date);
        console.log(date);
    }
    $(document).ready(adddate);

      const runTaskQuery = function () {
        $('#todoItems').empty();
        $.ajax({ url: '/api/taskList', method: 'GET' })
          .then(function (taskList) {
              let htmlstr = '';
              taskList.forEach(e => {
                  htmlstr += `<li id="todos"><span id="chore">${e.todoItem.toUpperCase()}</span>`;
                  htmlstr += `<button type="submit" id="remove" data-status=${e.completed} data-id=${e._id}>
                                    <i class="${e.button}" data-button=${e.button}></i>
                                        </button></li>`;
              });
              $('#todoItems').html(htmlstr);
        
            console.log(taskList);
          })
          .catch(function (err) {
            console.log(err);
        });
      }

      $(document).ready(runTaskQuery);
  
    
    const addTask = function(event) {
        event.preventDefault();
        const todoItem = $('#task').val().trim();
        console.log(todoItem);

        const newTask = {todoItem: todoItem};
       socket.emit('new-task', {todoItem: todoItem});
    
        $.ajax({ url: '/api/taskList', method: 'POST', data: newTask}).then(function(data) {
            console.log(newTask);
            $('#task').val('');
            runTaskQuery();
       });    
    }
       $('#submit').on('click', addTask);
       socket.on('emit-task', function(data){
        console.log(data);
        runTaskQuery();
    });

// const changeButton = function () {
//     $('.fa-circle').addClass('hide');
//     $('.fa-times-circle').addClass('show');
// }
// $('#todoItems').on('click', '#remove', changeButton);

$('#todoItems').on('click', '#remove', function(event) {
    event.preventDefault();
    const index = $(this).data('id');
    let status = $(this).data('status');
    let butstatus = $(this).data('button');
    console.log(butstatus);

    if (status === false) {
            status = true;
            butstatus = "far fa-times-circle"

    const updateTask = {
        _id: index,
        completed: status,
        button: butstatus
    };
   
    console.log(updateTask);
    socket.emit('complete-task', {data: updateTask});
    
    $.ajax({ url: `/api/taskList`, method: "PUT", data: updateTask})
    .then(function(data) {
        runTaskQuery();
   })
   socket.on('emit-task', function(data){
    console.log(data);
    runTaskQuery();
});
    } else {
    $.ajax({ url: `/api/taskList/${index}`, method: "DELETE"})
   .then(function(data) {
        socket.emit('delete-task', data);
        socket.on('emit-task', function(data){
        console.log(data);
        runTaskQuery();
        })
    });
};

});
    
});
