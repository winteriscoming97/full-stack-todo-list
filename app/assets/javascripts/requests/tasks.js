var tasks = [];
var state = 0;

$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  }
});

//get Tasks list
var indexTasks = function () {
  var request = {
    type: 'GET',
    url: '/api/tasks?api_key=1',
    success: function (response, textStatus) {
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
            renderTask(task);
            if (task.completed === true) {
              toggleCheck();
            }
          }
          //active button pressed
          else if (state === 1 && task.completed === true) {
            renderTask(task);
            toggleCheck();
          }
          //completed button pressed
          else if (state === 2 && task.completed === false) {
            renderTask(task);
          }
        });
        $('.left-to-complete').text(String(tasksLeft) + ' items left');
      }
    },
    error: ajaxError
  }

  $.ajax(request);
};


var postTask = function (event) {
  if (event.key === 'Enter') {
    var task = $(this).val();
    var request = {
      type: 'POST',
      url: '/api/tasks?api_key=1',
      data: {
        task: {
          content: task
        }
      },
      success: indexTasks,
      error: ajaxError
    }

    $.ajax(request);
    $(this).val('');
  }
}

//PUT Request
var markComplete = function (id) {
    var request = {
      type: 'PUT',
      url: '/api/tasks/' + id + '/mark_complete?api_key=1',
      dataType: 'json',
      success: indexTasks,
      error: ajaxError
    };

    $.ajax(request);
}

var markActive = function (id) {
    var request = {
      type: 'PUT',
      url: '/api/tasks/' + id + '/mark_active?api_key=1',
      dataType: 'json',
      success: indexTasks,
      error: ajaxError
    };

    $.ajax(request);
}

var deleteTask = function (id) {
    var request = {
      type: 'DELETE',
      url: '/api/tasks/' + id + '?api_key=1',
      dataType: 'json',
      success: indexTasks,
      error: ajaxError
    };

    $.ajax(request);
}

var renderTask = function (task) {
  return $('<div class="row task pt-2">' + '<span class="ml-2 mt-2 check-box" data-id="' + task.id + '">' + '<i class="fas fa-check check-mark">' + '</i>' + '</span>' + '<h2 class="col-10">' + task.content + '</h2>' + '<span class="ml-auto mt-2 mr-2 cancel" data-id="' + task.id + '">' + '<p>' + 'x' + '</p>' + '</span>' + '</div>').insertBefore('.end');
}

var ajaxError = function (req, textStatus, err) {
  if (err){
    console.log(err);
  }
  else {
    console.log('Request failed, no error object to show');
  }
}
