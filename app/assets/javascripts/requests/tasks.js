$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  }
});

var indexTasks = function (successCB, errorCB) {
  var request = {
    type: 'GET',
    url: 'api/tasks?api_key=1',
    success: successCB,
    error: errorCB
  }

  $.ajax(request);
};


var postTask = function (content, successCB, errorCB) {
  var request = {
    type: 'POST',
    url: 'api/tasks?api_key=1',
    data: {
      task: {
        content: content
      }
    },
    success: successCB,
    error: errorCB
  }

  $.ajax(request);
}

//POST Request
var postTask = function (event) {
  if (event.key === 'Enter') {
    var task = $(this).val();
    console.log('Task: ' + task);
    $.ajax({
      type: 'POST',
      url: 'api/tasks?api_key=1',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        task: {
          content: task
        }
      }),
      success: function (response, textStatus) {
        console.log(response);
        //update list
        fireGET();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
    $(this).val('');
  }
}

//PUT Request
var markComplete = function (id) {
    $.ajax({
      type: 'PUT',
      url: 'api/tasks' + id + '/mark_complete?api_key=1',
      dataType: 'json',
      success: function (response, textStatus) {
        fireGET();
      },
      error: function (req, textStatus, err) {
        console.log(err);
      }
    });
}

var markActive = function (id, successCB, ajaxError) {
    $.ajax({
      type: 'PUT',
      url: 'api/tasks' + id + '/mark_active?api_key=1',
      dataType: 'json',
      success: indexTasks(renderTasks, ajaxError),
      error: ajaxError()
    });
}


  //GET Request
var indexTasks = function (successCB, errorCB) {
  $.ajax({
    type: 'GET',
    url: 'api/tasks?api_key=1',
    dataType: 'json',
    success: successCB,
    error: errorCB
  });
}

var renderTasks = function (response, textStatus) {
  tasks = response.tasks;
  if (tasks) {
  //checks if the task array is empty
    $('.task').remove();
    var tasksLeft = 0;
    tasks.forEach(function (task) {
      if (task.completed === false) {
        tasksLeft++;
      }
      //default behavior
      if (state === 0) {
        taskUpdate(task);
        if (task.completed === true) {
          toggleCheck();
        }
      }
      //active button pressed
      else if (state === 1 && task.completed === true) {
        taskUpdate(task);
        toggleCheck();
      }
      //completed button pressed
      else if (state === 2 && task.completed === false) {
        taskUpdate(task);
      }
    });
    $('.left-to-complete').text(String(tasksLeft) + ' items left');
  }
}

var ajaxError = function (req, textStatus, err) {
  if (err){
    console.log(err);
  }
  else {
    console.log('Request failed, no error object to show');
  }
}
