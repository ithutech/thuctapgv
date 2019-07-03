var script_url = "https://script.google.com/macros/s/AKfycbyFfCFki08xRb5z0eAu9CbqZaz4JN3d_xtNb32laJSmVQ-vbu0/exec";

function update_pass_value() {
  var passgv_v1 = $("#matkhaumoi").val();
  var passgv_v2 = $("#nhaplaimatkhaumoi").val();
  if (passgv_v1 === passgv_v2 && passgv_v1.length >= 5 && passgv_v2.length >= 5)
    update_value();
  else {
    if (passgv_v1.length < 5 && passgv_v2.length < 5) {
      $("#re").html("<p style='text-align:center;color:red;'>Mật khẩu ít nhất 5 kí tự!</p>");
    } else {
      if (passgv_v1 == "" || passgv_v2 == "") {
        $("#re").html("<p style='text-align:center;color:red; font-size:16px;'>Mật khẩu không được bỏ trống!</p>");
      } else {
        $("#re").html("<p style='text-align:center;color:red; font-size:16px;'>Mật khẩu không trùng khớp!</p>");
      }
    }

  }

}

function update_value() {
  $("#re").css("visibility", "hidden");
  document.getElementById("loading_update").style.visibility = "visible";
  var idgv = $("#idgv_prof").val().replace(/ /g, '');
  var getPass = $("#matkhaumoi").val().replace(/ /g, '');
  var passgv = ITHUTECHMD5(getPass);
  var passgv_changed = $("#nhaplaimatkhaumoi").val().replace(/ /g, '');

  var url = script_url + "?callback=ctrlq&passgv=" + passgv + "&passgv_changed=" + passgv_changed + "&idgv=" + idgv + "&action=update";
  var request = jQuery.ajax({
    crossDomain: true,
    url: url,
    method: "GET",
    dataType: "jsonp"
  });

  //  setTimeout("location.href= '/'",5000);
}

function ctrlq(e) {
  $("#re").html(e.result);
  $("#re").css("visibility", "visible");
  document.getElementById("loading_update").style.visibility = "hidden";

}
// Khoong dung khoang trang cho mat khau
function BlockSpace(e) {
  var k = event ? event.which : window.event.keyCode;
  if (k == 32) return false;
}


function showhidepass() {
  var temp = document.getElementById("matkhaumoi");
  var temp_repeat = document.getElementById("nhaplaimatkhaumoi");

  if (temp.type === "password" || temp_repeat === "password") {
    temp.type = "text";
    temp_repeat.type = "text";
  } else {
    temp.type = "password";
    temp_repeat.type = "password";
  }
}
