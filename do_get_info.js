function stepGetGiangVien() {
    doLoading()
        .then(doGetGiangVien)
        .then(doComplete);
}

function stepGetSinhVien() {
    doLoading()
        .then(doGetSinhVien)
        .then(doComplete)
        .then(doShowUpdate);
}


function doLoading() {
    return new Promise(function (resolve, reject) {
        document.querySelector('.js-loading').classList.remove('is-hidden');
        resolve();
    });
}

function doGetGiangVien() {
    return new Promise(function (resolve, reject) {
        giangVienGet();
        resolve();
    });
}

function doComplete() {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            document.querySelector('.js-loading').classList.add('is-hidden');
        },1000);
        resolve();
    });
}

function giangVienGet() {
	
    var email = $.trim($("input[name='txtGVEmail']").val()).replace(/ /g,'');
    var sdt = $.trim($("input[name='txtGVSDT']").val()).replace(/ /g,'');
	
	var sdt1 = sdt.substring(1, sdt.length);
	
    if(email=='' || sdt =='')
    {
        alert("VUI LÒNG NHẬP ĐỦ THÔNG TIN EMAIL VÀ SỐ ĐIỆN THOẠI");
        return false;
    }
	
	$("#InfoGV").html('');

    var worksheets = [
        '', // defaults to first worksheet without id
        'ouab0ad'];
    worksheets.forEach(function (worksheet) {
        $.googleSheetToJSON('1nO2nV65Vi3dZWGlaIOXLEc-_JWEZK16XFbjQVH_3Q0U', worksheet)
            .done(function (rows) {
                var strText = "<table class='dtable'>";
                strText += "<tr><th>Tên SV</th>  <th>Lớp</th>  <th>Mã SV</th>  <th>Ngành</th>  <th>Ngày sinh</th>   <th>Môn học</th>  <th>SĐT SV</th>  <th>Email SV</th> ";
                var count = 0;
                rows.forEach(function (row) {
                    var strEmail = row['gvemail'].replace(/ /g,'');
                    var strDT = row['gvdienthoai'].replace(/ /g,'');
				if (strEmail == email && (strDT == sdt || strDT == sdt1)) {
                        count++;
                        strText += "<tr>";
                        Object.getOwnPropertyNames(row).forEach(function (name) {
                            if (name == 'sotc' || name == 'tt' || name == 'gvhoten' || name == 'gvemail' || name == 'gvdienthoai' || name == 'mand' || name == 'nhom' || name == 'mamh')
                                return;
                            var val = [].concat(row[name]).join(' / ');
                            strText += "<td>" + val + "</td>";
                        });
                        strText += "</tr>";
                    }
                });
                if (count == 0)
                    $("#InfoGV").html('Không tìm thấy thông tin');
                else
                    $("#InfoGV").html(strText);
            })
            .fail(function (err) {
                console.log('error!', err);

            });
    });
}