package com.bdtd.card.generator.web.config;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.baomidou.mybatisplus.generator.AutoGenerator;
import com.baomidou.mybatisplus.generator.InjectionConfig;
import com.baomidou.mybatisplus.generator.config.DataSourceConfig;
import com.baomidou.mybatisplus.generator.config.GlobalConfig;
import com.baomidou.mybatisplus.generator.config.PackageConfig;
import com.baomidou.mybatisplus.generator.config.StrategyConfig;
import com.baomidou.mybatisplus.generator.config.TemplateConfig;
import com.baomidou.mybatisplus.generator.config.po.TableInfo;
import com.baomidou.mybatisplus.generator.engine.BeetlTemplateEngine;
import com.bdtd.card.common.util.FileUtil;
import com.bdtd.card.common.web.util.ToolUtil;
import com.bdtd.card.generator.web.engine.SimpleTemplateEngine;
import com.bdtd.card.generator.web.engine.base.GunsTemplateEngine;
import com.bdtd.card.generator.web.engine.config.ContextConfig;
import com.bdtd.card.generator.web.engine.config.SqlConfig;

/**
 * 代码生成的抽象配置
 *
 * @author 
 * @date 2017-10-28-下午8:22
 */
public abstract class AbstractGeneratorConfig {

    /**
     * mybatis-plus代码生成器配置
     */
    GlobalConfig globalConfig = new GlobalConfig();

    DataSourceConfig dataSourceConfig = new DataSourceConfig();

    StrategyConfig strategyConfig = new StrategyConfig();

    PackageConfig packageConfig = new PackageConfig();

    TableInfo tableInfo = null;

    /**
     * Guns代码生成器配置
     */
    ContextConfig contextConfig = new ContextConfig();

    SqlConfig sqlConfig = new SqlConfig();

    protected abstract void config();

    public void init() {
        config();

        packageConfig.setService(contextConfig.getDaoPackage() + ".service");
        packageConfig.setServiceImpl(contextConfig.getDaoPackage() + ".service.impl");

        //controller没用掉,生成之后会自动删掉
        packageConfig.setController("TTT");

        if (!contextConfig.getEntitySwitch()) {
            packageConfig.setEntity("TTT");
        }

        if (!contextConfig.getDaoSwitch()) {
            packageConfig.setMapper("TTT");
            packageConfig.setXml("TTT");
        }

        if (!contextConfig.getServiceSwitch()) {
            packageConfig.setService("TTT");
            packageConfig.setServiceImpl("TTT");
        }

    }

    /**
     * 删除不必要的代码
     */
    public void destory() {
        String outputDir = globalConfig.getOutputDir() + "/TTT";
        FileUtil.deleteDir(new File(outputDir));
    }

    public AbstractGeneratorConfig() {
    }

    public void doMpGeneration() {
        init();
        AutoGenerator autoGenerator = new AutoGenerator();
        autoGenerator.setGlobalConfig(globalConfig);
        autoGenerator.setDataSource(dataSourceConfig);
        autoGenerator.setStrategy(strategyConfig);
        autoGenerator.setPackageInfo(packageConfig);
        autoGenerator.setTemplateEngine(new BeetlTemplateEngine());
        
        TemplateConfig templateConfig = new TemplateConfig()
        	    .setEntity("templates/entity.java").setXml("templates/mapper.xml");
        autoGenerator.setTemplate(templateConfig);
        
        InjectionConfig injectionConfig = new InjectionConfig() {
            //自定义属性注入:abc
            //在.ftl(或者是.vm)模板中，通过${cfg.abc}获取属性
            @Override
            public void initMap() {
                Map<String, Object> map = new HashMap<>();
                map.put("mapperFields", ToolUtil.getColumns(this.getConfig().getTableInfoList().get(0).getFields()));
                map.put("mapperPrefixFields", ToolUtil.getPrefixColumns(this.getConfig().getTableInfoList().get(0).getFields()));
                map.put("insertAllItems", ToolUtil.getInsertAllItems(this.getConfig().getTableInfoList().get(0).getFields()));
                map.put("constructFields", ToolUtil.getConstractFields(this.getConfig().getTableInfoList().get(0).getFields()));
                map.put("toString", ToolUtil.getToString(contextConfig.getEntityName(), this.getConfig().getTableInfoList().get(0).getFields()));
                this.setMap(map);
            }
        };
        //配置自定义属性注入
        autoGenerator.setCfg(injectionConfig);
        autoGenerator.execute();
        destory();

        //获取table信息,用于guns代码生成
        List<TableInfo> tableInfoList = autoGenerator.getConfig().getTableInfoList();
        if (tableInfoList != null && tableInfoList.size() > 0) {
            this.tableInfo = tableInfoList.get(0);
        }
    }

    public void doGunsGeneration() {
        GunsTemplateEngine GunsTemplateEngine = new SimpleTemplateEngine();
        GunsTemplateEngine.setContextConfig(contextConfig);
        sqlConfig.setConnection(dataSourceConfig.getConn());
        GunsTemplateEngine.setSqlConfig(sqlConfig);
        GunsTemplateEngine.setTableInfo(tableInfo);
        GunsTemplateEngine.start();
    }
}
