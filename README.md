# 通用组件---高级查询
- [1.介绍](#index1)
- [2.界面展示](#index2)
- [3.使用说明](#index3)
- [4.实例](#index4)
- [5.组件更新说明](#index0)

## <a name="index1">1.介绍</a>
高级查询是基于bootstrap-table组件上开发的一个扩展组件。

在传统的表格数据呈现的页面，上部分一般是各种查询条件，中间是操作按钮，下面是表格数据，最下面是分页组件

而因为上面的查询条件会占用一定高度，导致最关键的数据呈现高度变小，如果用户的电脑分辨率再不高的话，会导

致用户最关心的数据呈现部分展示的很小一部分。为了避免这种情况的发生，所以开发了高级查询的组件，它大大缩

小了查询条件占用的篇幅，而将数据呈现部分呈现的更多。

## <a name="index2">2.界面展示</a>

高级查询呈现在表格上方的工具bar上，对齐方式可以灵活配置，有一个简单查询的输入框，开发人员可以自行定义

一个简单查询的input框的key，在查询时会将这个key传递到后台，在简单查询后面跟着有一个高级查询的按钮，点

击后，会在按钮下方悬浮一个查询框，里面显示的内容是在表格组件上配置的相关内容，点击提交时会将数据传递到

后台，进行条件的过滤，界面呈现如下

&emsp; ![](/markdown/img/19.jpg)

高级查询按钮点击后的界面：

&emsp; ![](/markdown/img/20.jpg)

### <a name="index3">3.使用说明</a>

因为是基于bootstrap-table这个组件扩展的组件，所以高级查询的相关配置都在bootstrap-table的配置中。以下

介绍如何使用：

- superSearch(boolean)：是否开启高级查询，默认false
- superSearchAlign(string)：高级查询的对齐方式，left|right
- searchPlaceholder(string)：快速查询的输入框上的文字placeholder
- superSearchItems(array)：格式为json数组，每一个json对象定义一个高级查询的查询条件

以下为superSearchItems的说明

- field(string)：高级查询项的key(传递到后台使用)
- label(string)：高级查询项的显示名称
- placeholder(string)：高级查询项的placeholder
- type(string)：高级查询项的类型，text|date|select|combobox
- selectorUrl(string)：高级查询项如果为select，则这里是select的远程数据获取地址
- selectorData(string)：高级查询项如果为select，则这里是select的本地数据内容格式如下：[{id:'',text:''}]
- selectorId(string)：高级查询项如果为select，如果远程数据返回的主键key不是id的话，这里需要配置远程数据返回的key名称
- selectorText(string)：高级查询项如果为select，如果远程数据返回的显示text不是text的话，这里需要配置远程数据返回的text名称
- selectorControl(string)：高级查询项如果为select，如果是级联下拉框这里填写子下拉框的field值，如果为多个则用逗号分开
- selectorDepend(string)：高级查询项如果为select，如果是级联下拉框这里填写父下拉框的field值
- dateFormat(string)：高级查询项如果为date，这里配置的是日期时间格式，例如：yyyy-mm-dd hh:mi，最细支持到分钟
- allowSearch(boolean)：下拉框是否允许输入进行检索
- 格式图例

&emsp;isSingleDate:true,dateFormat:YYYY&emsp; ![](/markdown/img/date1.png)

&emsp;isSingleDate:true,dateFormat:YYYY-MM&emsp; ![](/markdown/img/date2.png)

&emsp;isSingleDate:true,dateFormat:YYYY-MM-DD&emsp; ![](/markdown/img/date3.png)

&emsp;isSingleDate:true,dateFormat:YYYY-MM-DD HH&emsp; ![](/markdown/img/date3.png) ![](/markdown/img/date4.png)

&emsp;isSingleDate:true,dateFormat:YYYY-MM-DD HH:mi&emsp; ![](/markdown/img/date3.png) ![](/markdown/img/date4.png) ![](/markdown/img/date5.png)


额外说明：

1. 如果bootstrap-table的数据分页是client(sidePagination:'client')的话，高级查询前的快速搜索则可以搜索整个所有的显示列的信息
2. 如果bootstrap-table的数据分页是server(sidePagination:'server')的话，需要在bootstrap-table配置queryParams的配置项，
其中params.searchText为快速搜索的输入内容
```
queryParams : function(params) {
    return {
        offset: params.offset,//分页信息
        pageSize: params.limit,//分页信息
        searchText:params.searchText//快速搜索值，searchText为传递到后台的key，可以自行定义
    }
}
```

3. 快速搜索内容输入后按回车即可搜索，或者点击搜索按钮即可搜索


## <a name="index4">4.实例</a>
以下列出一个具体的使用案例
```
$('#table').bootstrapTable({
        height : '100%',
        method : 'get',
        url : 'getNeTypeDatas.action',
        dataType : "json",
        striped : true,// 使表格有条纹
        pagination : true,// 在表格底部显示分页
        pageNumber : 1,
        pageSize : 20,
        cache : false,// 是否使用缓存
        pageList : [ 20, 50, 100 ],
        paginationLoop : false,
        idField : 'id',// 标识哪个字段为id主键
        sidePagination : "client",// 表格分页的位置
        queryParamsType : "limit", // 参数格式,发送标准的RESTFul类型的参数请求
        clickToSelect: true,//点击行即可选中单选/复选框
        sortable: true,
        showRefresh: false,
        showToggle: false,
        showPaginationSwitch: false,
        search: false,
        toolbar: '#toolbar',
        singleSelect:true,

        superSearch:true,
        searchOnEnterKey:true,
        superSearchAlign:'right',
        searchPlaceholder:'网元类型名称',
        superSearchItems:[{
            field:'neTypeName',
            label:'网络类型名称',
            placeholder:'网络类型名称',
            type:'text',
            selectorUrl:'',
            dateFormat:'',
            selectorData:[]
        },{
            field:'startDate',
            label:'开始时间',
            placeholder:'开始时间',
            type:'date',
            selectorUrl:'',
            dateFormat:'yyyy-mm-dd',
            selectorData:[]
        },{
            field:'status',
            label:'状态',
            placeholder:'状态',
            type:'select',
            selectorUrl:'',
            dateFormat:'',
            selectorData:[{id:'1',text:'生效'},{id:'2',text:'失效'}]
        },{
            field:'netTypeId',
            label:'网络类型',
            placeholder:'网络类型',
            type:'select',
            selectorUrl:'cmnet/getNetTypeDatas.action',
            dateFormat:'',
            selectorData:[],
            selectorId:'netTypeId',
            selectorText:'cnName',
            selectorControl:'neTypeId'
        },{
            field:'neTypeId',
            label:'网元类型',
            placeholder:'网元类型',
            type:'select',
            selectorUrl:'getNeTypeDatas.action',
            dateFormat:'',
            selectorData:[],
            selectorId:'neTypeId',
            selectorText:'cnName',
            selectorDepend:'netTypeId'
        }],

        queryParams : function(params) {
            return {
                offset: params.offset,
                pageSize: params.limit,
                searchText:params.searchText,
                netTypeId: ""
            }
        },
        columns : [{
            checkbox: true
        },{
            field:'neTypeId',
            title:'网元类型标识'
        },{
            field:'netTypeId',
            title:'网络类型标识'
        },{
            field:'netTypeName',
            title:'网络类型名称'
        },{
            field:'enName',
            title:'网元类型英文名称'
        },{
            field:'cnName',
            title:'网元类型中文名称'
        }]
    });
```

## <a name="index0">5.组件更新说明</a>


