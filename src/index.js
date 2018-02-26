(function ($) {
    $.initTable = {
        initTableColumn: function () {
            var columns = [];
            columns.push({field: 'name', title: '姓名'},
                {field: 'province', title: '省份'},
                {field: 'city', title: '城市'},
                {field: 'sex', title: '性别'},
                {field: 'age', title: '年龄'},
                {field: 'birth', title: '出生日期'});
            return columns;
        },
        initTableSuperColumn: function () {
            var columns = [];
            columns.push({
                field: 'find_name',
                label: '姓名',
                placeholder: '姓名',
                type: 'text'
            }, {
                field: 'find_province',
                label: '省份',
                placeholder: '省份',
                type: 'select',
                selectorUrl: 'xxx.json',
                selectorId: 'province',
                selectorText: 'provinceName',
                selectorControl: 'find_city'
            }, {
                field: 'find_city',
                label: '城市',
                placeholder: '城市',
                type: 'select',
                selectorUrl: 'xxx.json',
                selectorId: 'city',
                selectorText: 'cityName',
                selectorDepend: 'find_province'
            }, {
                field: 'find_sex',
                label: '性别',
                placeholder: '性别',
                type: 'select',
                selectorId: 'sex',
                selectorData: [
                    {text: '男', id: 'man'},
                    {text: '女', id: 'woman'}]
            }, {
                field: 'find_birth',
                label: '出生日期',
                placeholder: '出生日期',
                type: 'date',
                dateFormat: 'yyyy-mm-dd'
            });
            return columns;
        },
        initTable: function () {
            $('#superSearch').bootstrapTable({
                height: '100%',
                method: 'get',
                url: 'a.json',
                dataType: "json",
                striped: true,// 使表格有条纹
                pagination: true,// 在表格底部显示分页
                pageNumber: 1,
                pageSize: 20,
                cache: false,// 是否使用缓存
                pageList: [20, 50, 100],
                paginationLoop: true,
                idField: 'name',// 标识哪个字段为id主键
                sidePagination: "client",// 表格分页的位置
                queryParamsType: "", // 参数格式,发送标准的RESTFul类型的参数请求
                clickToSelect: true,//点击行即可选中单选/复选框
                singleSelect: true,
                sortable: false,
                showRefresh: false,
                showToggle: false,
                showPaginationSwitch: false,
                search: false,
                columns:$.initTable.initTableColumn(),
                toolbar: '#toolbar',
                superSearch:true,
                searchOnEnterKey:true,
                superSearchAlign:'right',
                searchPlaceholder:'姓名',
                superSearchItems:$.initTable.initTableSuperColumn()
            });
        }
    };
    $(function () {
        $.initTable.initTable();
    });
})(jQuery);