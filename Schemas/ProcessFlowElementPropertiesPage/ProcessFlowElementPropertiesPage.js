 define("ProcessFlowElementPropertiesPage", ["SourceCodeEditEnums", "SourceCodeEdit", "ProcessModuleUtilities"],
	function(sourceCodeEditEnums) {
		return {
			modules: {
				"SqlQueryModule": {
					"config": {
						"schemaName": "SqlSourceCodeEditPage",
						"isSchemaConfigInitialized": true,
						"useHistoryState": false,
						"showMask": true,
						"autoGeneratedContainerSuffix": "-sql-query-schema",
						"parameters": {
							"viewModelConfig": {
								"Tag": "sql-query",
								"Caption": "SQL запрос"
							}
						}
					}
				},
				"SqlQueryPlanModule": {
					"config": {
						"schemaName": "SqlSourceCodeEditPage",
						"isSchemaConfigInitialized": true,
						"useHistoryState": false,
						"showMask": true,
						"autoGeneratedContainerSuffix": "-sql-query-plan-schema",
						"parameters": {
							"viewModelConfig": {
								"Tag": "sql-query-plan",
								"Caption": "План запроса"
							}
						}
					}
				}
			},
			methods: {
				onRender: function() {
					this.callParent(arguments);

					if(this.getIsEditPageDefault()) {
						this.hideTabByName("SqlTab", true);
						this.hideTabByName("SqlQueryPlanTab", true);
					}
				},
				getTabs: function() {
					var tabs = this.callParent(arguments);
					if(!this.getIsEditPageDefault()) {
						tabs.push({
							Name: "SqlTab",
							Caption: "Запрос",
							MarkerValue: "SqlTab"
						});
						tabs.push({
							Name: "SqlQueryPlanTab",
							Caption: "План запроса",
							MarkerValue: "SqlQueryPlanTab"
						});
					}					
					return tabs;
				},

				hideTabByName: function(tabName, isHide){
					var tabsCollection = this.get("TabsCollection");
					if(tabsCollection){
						var tabIndex = tabsCollection.collection.keys.indexOf(tabName);
						var tabsPanelDomElement = document.getElementById("ProcessSchemaPropertiesPageTabsTabPanel-tabpanel-items");
						if(tabsPanelDomElement){
							tabDomElement = tabsPanelDomElement.querySelector('[data-item-index="'+tabIndex.toString()+'"]');
							if(tabDomElement){
								if(isHide){
									tabDomElement.style.display = "none";
								} else {
									tabDomElement.style.display = null;
								}
							}
						}    
					}
				},
			},
			diff: [
				{
					"operation": "insert",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"name": "SqlTab",
					"values": {
						"wrapClass": ["tabs", "methods-tab"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "SqlTab",
					"propertyName": "items",
					"name": "SqlQueryModule",
					"values": {
						"itemType": Terrasoft.ViewItemType.MODULE,
						"classes": {
							"wrapClassName": "process-methods process-methods-container"
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "Tabs",
					"propertyName": "tabs",
					"name": "SqlQueryPlanTab",
					"values": {
						"wrapClass": ["tabs", "methods-tab"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "SqlQueryPlanTab",
					"propertyName": "items",
					"name": "SqlQueryPlanModule",
					"values": {
						"itemType": Terrasoft.ViewItemType.MODULE,
						"classes": {
							"wrapClassName": "process-methods process-methods-container"
						},
						"items": []
					}
				},
			]
		};
 });