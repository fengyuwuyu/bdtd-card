package com.bdtd.card.generator.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bdtd.card.common.base.model.EnumError;
import com.bdtd.card.common.util.FileUtil;
import com.bdtd.card.common.web.base.BaseController;
import com.bdtd.card.common.web.base.Tip;
import com.bdtd.card.common.web.properties.DbProperties;
import com.bdtd.card.generator.web.config.WebGeneratorConfig;
import com.bdtd.card.generator.web.factory.DefaultTemplateFactory;
import com.bdtd.card.generator.web.model.GenQo;
import com.bdtd.card.generator.web.service.TableService;

/**
 * 代码生成控制器
 *
 * @author 
 * @Date 2017年11月30日16:39:19
 */
@Controller
@RequestMapping("/code")
public class CodeController extends BaseController {

    private static String PREFIX = "/code";

    @Autowired
    private TableService tableService;

    @Autowired
    private DbProperties dbProperties;

    /**
     * 跳转到代码生成主页
     */
    @RequestMapping("")
    public String blackboard(Model model) {
        model.addAttribute("tables", tableService.getAllTables());
        model.addAttribute("params", DefaultTemplateFactory.getDefaultParams());
        model.addAttribute("templates", DefaultTemplateFactory.getDefaultTemplates());
        return PREFIX + "/code.html";
    }

    /**
     * 生成代码
     */
    @RequestMapping(value = "/generate", method = RequestMethod.POST)
    @ResponseBody
    public Object generate(GenQo genQo) {
    	if (!FileUtil.checkExist(genQo.getProjectPath()) || !FileUtil.checkExist(genQo.getDataProjectPath())) {
    		return new Tip(EnumError.FILE_NOT_EXIST);
    	}
        genQo.setUrl(dbProperties.getUrl());
        genQo.setUserName(dbProperties.getUsername());
        genQo.setPassword(dbProperties.getPassword());
        WebGeneratorConfig webGeneratorConfig = new WebGeneratorConfig(genQo);
        webGeneratorConfig.doMpGeneration();
        webGeneratorConfig.doGunsGeneration();
        return SUCCESS_TIP;
    }
}
