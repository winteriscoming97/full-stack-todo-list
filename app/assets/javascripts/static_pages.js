var toggleCheck = function () {
  $('.container').children().last().prev().children('.check-box').children().toggle('fast');
};

var toggleCancel = function () {
  $(this).children('.cancel').toggle();
}

$(document).on("turbolinks:load", function () {
  if ($('.static_pages.index').length > 0) {
    indexTasks();

    $('input').keypress(postTask);

    $(document).on('click', '.cancel', function () {
      var id = $(this).data('id');
      deleteTask(id);
    });

  $(document).on('click', '.check-box', function () {
    if ($(this).children().first().css('display') === 'none') {
      markComplete($(this).data('id'));
    }
    else {
      markActive($(this).data('id'));
    }
  });


  $('.btn-all').click(function () {
    state = 0;
    indexTasks();
  });

  $('.btn-active').click(function () {
    state = 2;
    indexTasks();
  });

  $('.btn-completed').click(function () {
    state = 1;
    indexTasks();
  });

  $(document).on('mouseenter mouseleave', '.task', toggleCancel);
  };
});
