  define("DeleteDataUserTaskPropertiesPage", ["ServiceHelper"], function(ServiceHelper) {
	const serviceName = "SpaceConvertFilterDataToEsqService";
	const getQueryMethodName = "GetQueryDeleteDataUserTask";
	const getQueryPlanMethodName = "GetQueryPlanDeleteDataUserTask";
	
	return {
		messages: {
			"GetSqlSourceCodeData": {
				"direction": Terrasoft.MessageDirectionType.SUBSCRIBE,
				"mode": Terrasoft.MessageMode.PTP
			},

			"SetSqlSourceCodeData": {
				"direction": Terrasoft.MessageDirectionType.PUBLISH,
				"mode": Terrasoft.MessageMode.PTP
			}
		},
		methods: {
			init: function() {
				this.callParent(arguments);

				this.sandbox.subscribe("GetSqlSourceCodeData", this.onGetQueryButtonClick, this, [this.getModuleId("SqlQueryModule")]);
				this.sandbox.subscribe("GetSqlSourceCodeData", this.onGetQueryPlanButtonClick, this, [this.getModuleId("SqlQueryPlanModule")]);
			},

			onGetQueryButtonClick: function(tag) {
				this.loadSqlSourceCodeData(getQueryMethodName, tag);
			},

			onGetQueryPlanButtonClick: function(tag) {
				this.loadSqlSourceCodeData(getQueryPlanMethodName, tag);
			},

			getInputData: function() {
				var serializationInfo = this.$FilterEditData.getDefSerializationInfo();
				serializationInfo.serializeFilterManagerInfo = true;
				var serializedFilterEditData = this.$FilterEditData.serialize(serializationInfo);

				var ignoreDisplayValues = this.$Parameters.collection.find(x => x.values.Id === 'IgnoreDisplayValues')?.$Value.value === '[#BooleanValue.True#]';

				return {
					request: {
						schemaName: this.$EntitySchemaSelect.name,
						filters:  serializedFilterEditData,
						ignoreDisplayValues: ignoreDisplayValues
					}
				};
			},

			loadSqlSourceCodeData: function(methodName, tag) {
				var inputData = this.getInputData();

				ServiceHelper.callService({
					serviceName: serviceName,
					methodName: methodName,
					scope: this,
					data: inputData,
					callback: function(response) {
						var result = response[`${methodName}Result`];

						this.sandbox.publish("SetSqlSourceCodeData", result.query || result.exception, [tag]);
					}
				});
			}
		},
	};
});