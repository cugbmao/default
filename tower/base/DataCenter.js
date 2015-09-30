var Class = { // 全局静态类, 用于声明一个新的类并提供构造函数支持
	create: function() {   
		return function() { // 返回一个函数, 代表着这个新声明的类的构造函数
			// 一个命名为initialize的函数将被这个类实现作为类的构造函数
			this.initialize.apply(this, arguments);// initialize函数将在你实例化一个变量的时候被调用执行(即上面7个步骤中的第5步)
		};
	}
};
/** @description: DataCenter类
 */
var DataCenter = Class.create(); // 类的声明              
DataCenter.prototype = {
	initialize: function() { // 构造函数   
		this.header = new Header();
		this.body = new Body();
		this.parameter = {};
	},
	/** @description: 获取Header
	 *  @return: Header对象
	 */
	getHeader: function() { // 成员函数  
		return this.header;
	},
	/** @description: 设置Header
	 *  @param: header Header对象
	 */
	setHeader: function(header) { // 成员函数  
		this.header = header;
	},
	/** @description: 获取Body
	 *  @return: Body对象
	 */
	getBody: function() { // 成员函数  
		return this.body;
	},
	/** @description: 设置Body
	 *  @param: body Body对象
	 */
	setBody: function(body) { // 成员函数  
		this.body = body;
	},
	/** @description: 获取参数
	 *  @return 参数值
	 */
	getParameter: function(key){
		return this.parameter[key];
	},
	/** @description: 设置参数
	 *  @param: key 键
	 *  @param: value 值
	 */
	addParameter: function(key, value){
		this.parameter[key] = value;
	}
};

/** @description: Header类
 */
var Header = Class.create(); // 类的声明              
Header.prototype = {
	initialize: function() { // 构造函数   
		this.code = 1;
		this.message = new Message();
	},
	/** @description: 获取状态码
	 *  @return: 状态码
	 */
	getCode: function() { // 成员函数  
		return this.code;
	},
	/** @description: 设置状态码
	 *  @param: code 状态码
	 */
	setCode: function(code){
		this.code = code;
	},
	/** @description: 获取状态信息
	 *  @return: 状态信息
	 */
	getMessage: function() { // 成员函数  
		return this.message;
	},
	/** @description: 设置状态信息
	 *  @param: message 状态信息
	 */
	setMessage: function(message){
		this.message = message;
	}
};
/** @description: Message类
 */
var Message = Class.create(); // 类的声明              
Message.prototype = {
	initialize: function() { // 构造函数   
		this.title = "";
		this.detail = "";
	},
	/** @description: 获取信息头
	 *  @return: 信息头
	 */
	getTitle: function() { // 成员函数  
		return this.title;
	},
	/** @description: 设置信息头
	 *  @param: title 信息头
	 */
	setTitle: function(title){
		this.title = title;
	},
	/** @description: 获取详细信息
	 *  @return: 详细信息
	 */
	getDetail: function() { // 成员函数  
		return this.detail;
	},
	/** @description: 设置详细信息
	 *  @param: detail 详细信息
	 */
	setDetail: function(detail){
		this.detail = detail;
	}
};

/** @description: Body类
 */
var Body = Class.create(); // 类的声明              
Body.prototype = {
	initialize: function() { // 构造函数   
		this.dataStore = new DataStore();
	},
	/** @description: 获取DataStore
	 *  @param: dsName DataStore名称
	 *  @return: DataStore对象
	 */
	getDataStore: function(dsName) { // 成员函数  
		return this.dataStore[dsName];
	},
	/** @description: 添加DataStore
	 *  @param: ds DataStore对象
	 */
	addDataStore: function(ds){
		var dsName = typeof(ds.dataSetName)!="undefined" ? ds.dataSetName : ds.getDataSetName;
		this.dataStore[dsName] = ds;
	},
	/** @description: 添加DataStore
	 *  @param: dsName DataStore名称
	 *  @param: ds DataStore对象
	 */
	setDataStore: function(dsName, ds){
		this.dataStore[dsName] = ds;
	}
};
/** @description: DataStore类
 */
var DataStore = Class.create();
DataStore.prototype = {
	initialize: function(dataSetName){
		this.dataSetName = dataSetName;
		this.rowSet = new RowSet();
		/*this.name = "";
		this.order = "";
		this.pageNo = 1;
		this.pageSize = 10;
		this.recordCount = 0;*/
	},
	/** @description: 获取DataStore名称
	 *  @return: DataStore名称
	 */
	getDataSetName: function(){
		return this.dataSetName;
	},
	/** @description: 获取RowSet对象
	 *  @return: RowSet对象
	 */
	getRowSet: function(){
		return this.rowSet;
	},
	/** @description: 设置RowSet
	 *  @param: rs RowSet对象
	 */
	setRowSet: function(rs){
		this.rowSet = rs;
	}
};
/** @description: RowSet类
 */
var RowSet = Class.create();
RowSet.prototype = {
	initialize: function(){
		this.primary = [];
	},
	/** @description: 添加单行数据
	 *  @param: row 数据行 例如{"id":"1", "name":"zhang"}
	 */
	addRow: function(row){
		this.primary.push(row);
	},
	/** @description: 添加多行数据
	 *  @param: rows 数据行 例如[{"id":"1", "name":"zhang"}, {"id":"2", "name":"li"}]
	 */
	addRows: function(rows){
		this.primary.concat(rows);
	},
	/** @description: 在指定位置插入数据
	 *  @param: row 数据行 例如{"id":"1", "name":"zhang"}
	 *  @param: index 行号
	 */
	insertRow: function(row, index){
		this.primary.splice(index, 1, row);
	},
	/** @description: 删除单行数据
	 *  @param: index 行号
	 */
	deleteRow: function(index){
		this.primary.splice(index, 1);
	},
	/** @description: 删除多行数据
	 *  @param: indexs 行号数据 例如[1,4,5]
	 */
	deleteRows: function(indexs){
		for(var i in indexs){
			this.primary.splice(i, 1);
		}
	},
	/** @description: 获取数据行
	 *  @param: index 行号数据 例如1
	 */
	getRow: function(index){
		return primary[index];
	}
};

var dataCenter = new DataCenter();