var isCheckAll = false;
function swapCheck() {
    if (isCheckAll) {
        $("input[type='checkbox']").each(function() {
            this.checked = false;
        });
        isCheckAll = false;
    } else {
        $("input[type='checkbox']").each(function() {
            this.checked = true;
        });
        isCheckAll = true;
    }
}


function post_checked_ids(dest_url) {
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken)
            }
        }
    })
    var form = new FormData();
    var id_array = [];
    var csrftoken = "{{ csrf_token() }}"
    $("tr input[id]:checked").each(function(){
        id_array.push($(this).attr("id").replace(/\//, ''));
        console.log(id_array);
    });

    form.append("ids", id_array);
    $.ajax({
        url: dest_url,
        method:"POST",
        contentType: false, //设置为false直接发字符串过去
        data:form,
        processData:false,
        success: function () {
            location.reload();
        },
        error: function (result) {
            form.forEach(function(value){
                console.log('error');
            });
        },
    })
}

