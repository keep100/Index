$(function () {
    load();
    $('#title').on("keydown", function (e) {
        if (e.keyCode === 13) {
            if ($(this).val().trim()) {
                let local = getData();
                local.push({ title: $(this).val(), done: false });
                saveData(local);
                load();
                $(this).val("");
            }
            else {
                alert("请输入任务内容");
            }
        }
    })
    $('ol,ul').on('click', 'a', function () {
        // alert($(this).attr("id"));
        let data = getData();
        let index = $(this).attr("id");
        data.splice(index, 1);
        saveData(data);
        load();
    })
    $('ol,ul').on('click', 'input', function () {
        let data = getData();
        let index = $(this).siblings('a').attr("id");
        data[index].done = $(this).prop("checked");
        saveData(data);
        load();
    })
    $('footer').on('click', 'a', function () {
        localStorage.clear();
        load();
    })
    function getData() {
        let data = localStorage.getItem("todo");
        if (data != null) return JSON.parse(data);
        return [];
    }
    function saveData(data) {
        localStorage.setItem("todo", JSON.stringify(data));
    }
    function load() {
        let data = getData();
        $('ol,ul').empty();
        let todo = 0, done = 0;
        $.each(data, function (i, e) {
            if (!e.done) {
                $('ol').prepend("<li><input type='checkbox'><p>" + e.title + "</p><a href='javascript:;' id=" + i + "></a></li>");
                todo++;
            }
            else {
                $('ul').prepend("<li><input type='checkbox' checked='true'><p>" + e.title + "</p><a href='javascript:;' id=" + i + "></a></li>");
                done++;
            }
        })
        $('#todocount').text(todo);
        $('#donecount').text(done);
    }
})
