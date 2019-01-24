var BlackBoard = {
	initPie: function() {
		Feng.ajaxAsyncJson(Feng.ctxPath + '/blackboard/pieChart', {}, function(data) {
			if (!data) {
				return;
			}
			
			var labelTop = {
				    normal : {
				        label : {
				            formatter : '{b}',
				            textStyle: {
				                baseline : 'center'
				            }
				        },
				        labelLine : {
				            show : false
				        }
				    }
				};
				var labelFormatter = {
				    normal : {
				        label : {
				            show : true,
				            position : 'center',
				            formatter : function (params){
				            	if (params.data.name === '') {
				            		return '';
				            	}
				            	return params.data.name + ": " + params.value + '人';
				            },
				            textStyle: {
				                baseline : 'center'
				            }
				        }
				    },
				};
				var labelBottom = {
				    normal : {
				        color: '#a3a3a3',
				        label : {
				            show : false,
				            position : 'center'
				        },
				        labelLine : {
				            show : false
				        }
				    },
				    emphasis: {
				        color: 'rgba(0,0,0,0)'
				    }
				};
				var radius = [60, 75];
				var option = {
				    legend: {
				        x : 'center',
				        y : 'bottom',
				        padding: 0,
				        data: ["今日就诊", "本月就诊", "总就诊"],
				        textStyle: {
				        	fontSize: 14
				        }
				    },
			        textStyle: {
			        	fontSize: 14
			        },
//				    title : {
//				        text: 'The App World',
//				        subtext: 'from global web index',
//				        x: 'center'
//				    },
				    toolbox: {
				        show : false,
				        feature : {
				            dataView : {show: true, readOnly: false},
				            magicType : {
				                show: true, 
				                type: ['pie', 'funnel'],
				                option: {
				                    funnel: {
				                        width: '20%',
				                        height: '30%',
				                        itemStyle : {
				                            normal : {
				                                label : {
				                                    formatter : function (params){
				                                        return 'other\n' + params.value + '%\n'
				                                    },
				                                    textStyle: {
				                                        baseline : 'middle'
				                                    }
				                                }
				                            },
				                        } 
				                    }
				                }
				            },
				            restore : {show: true},
				            saveAsImage : {show: true}
				        }
				    },
				    series : [
				        {
				            type : 'pie',
				            center : ['20%', '45%'],
				            radius : radius,
				            x: '0%', // for funnel
				            itemStyle : labelFormatter,
				            data : [
				            	{name:'昨日就诊', value: data.preDay, itemStyle : labelBottom},
				                {name:'今日就诊', value: data.currDay, itemStyle : labelTop}
				            ]
				        },
				        {
				            type : 'pie',
				            center : ['50%', '45%'],
				            radius : radius,
				            x:'30%', // for funnel
				            itemStyle : labelFormatter,
				            data : [
				                {name:'上月就诊', value: data.preMonth, itemStyle : labelBottom},
				                {name:'本月就诊', value: data.currMonth, itemStyle : labelTop}
				            ]
				        },
				        {
				            type : 'pie',
				            center : ['80%', '45%'],
				            radius : radius,
				            x:'60%', // for funnel
				            itemStyle : labelFormatter,
				            data : [
				                {name:'总就诊', value: data.total,itemStyle : labelTop}
				            ]
				        }
				    ]
				};
				
				var myChart = echarts.init(document.getElementById('pie'));
				myChart.setOption(option);
		});
	},
	
	monthlyWoundChart: function() {
		Feng.ajaxAsyncJson(Feng.ctxPath + '/comprehensive/monthlyWoundChart', {}, function(data) {
			if (!data) {
				return;
			}
			
			var myChart = echarts.init(document.getElementById('monthlyChart'));
			option = {
				    title : {
				        text: '最近12个月全团伤病员发生情况',
				        x:'center',
				        textStyle: {
				        	fontSize: 24
				        }
				    },
				    tooltip : {
				        trigger: 'axis'
				    },
			        textStyle: {
			        	fontSize: 14
			        },
				    legend: {
				        orient : 'vertical',
				        data:['住院人数','门诊人数'],
				        align: 'left',
				        right: 30,
				        type: 'scroll',
				        textStyle: {
				        	fontSize: 14
				        }
//				        show: false
				        
				    },
				    toolbox: {
				        show : false,
				        feature : {
				            mark : {show: true},
				            dataView : {show: true, readOnly: false},
				            magicType : {show: true, type: ['line', 'bar']},
				            restore : {show: true},
				            saveAsImage : {show: true}
				        }
				    },
				    calculable : true,
				    xAxis : [
				        {
				            type : 'category',
				            data : data.xAxisData
				        }
				    ],
				    yAxis : [
				        {
				            type : 'value'
				        }
				    ],
				    series : [
				        {
				            name:'住院人数',
				            type:'bar',
				            data: data.inHospitalData,
				        },
				        {
				            name:'门诊人数',
				            type:'bar',
				            data:data.patientInfoData,
				        }
				    ]
				};
		    	                    
		    myChart.setOption(option);
		});
	},
	
	woundAbsentChart: function() {
		Feng.ajaxAsyncJson(Feng.ctxPath + '/comprehensive/woundAbsentChart', {}, function(data) {
			if (!data) {
				return;
			}
			
			var myChart = echarts.init(document.getElementById('currChart'));
			var option = {
				    title : {
				        text: '因病缺勤动态分布',
				        x:'center',
				        textStyle: {
				        	fontSize: 24
				        }
				    },
			        textStyle: {
			        	fontSize: 14
			        },
				    tooltip : {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} ({d}%)"
				    },
				    legend: {
				        orient : 'vertical',
				        right: '9%',
				        data:['卫生队住院', '外院住院', '全休', '半休'/*, "总人数"*/],
				        textStyle: {
				        	fontSize: 14
				        }
				    },
				    toolbox: {
				        show : false,
				        feature : {
				            mark : {show: true},
				            dataView : {show: true, readOnly: false},
				            magicType : {
				                show: true, 
				                type: ['pie', 'funnel'],
				                option: {
				                    funnel: {
				                        x: '25%',
				                        width: '50%',
				                        funnelAlign: 'left',
				                        max: 1548
				                    }
				                }
				            },
				            restore : {show: true},
				            saveAsImage : {show: true}
				        }
				    },
				    calculable : true,
				    series : [
				        {
				            name:'缺勤详情',
				            type:'pie',
				            radius : '55%',
				            center: ['50%', '60%'],
				            data:[
				                {value: data.inHospitalCount, name: '卫生队住院'},
				                {value: data.inHospitalOtherCount, name: '外院住院'},
				                {value: data.fullRestCount, name: '全休'},
				                {value: data.falfRestCount, name: '半休'}/*,
				                {value: data.total, name: '总人数'},*/
				            ]
				        }
				    ]
				};
		    	                    
		    myChart.setOption(option);
		});
	}
};

$(function() {
	BlackBoard.initPie();
	BlackBoard.monthlyWoundChart();
	BlackBoard.woundAbsentChart();
});