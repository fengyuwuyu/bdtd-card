package com.bdtd.card.data.admin.modular.treatment.controller;

import java.util.Date;
import java.util.Map;
import com.bdtd.card.common.base.controller.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Autowired;
import com.bdtd.card.data.admin.core.log.LogObjectHolder;
import org.springframework.web.bind.annotation.RequestParam;
import com.bdtd.card.data.admin.modular.system.model.DeptCopy;
import com.bdtd.card.data.admin.modular.treatment.service.IDeptCopyService;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.stylefeng.guns.core.consts.Consts;
import com.stylefeng.guns.core.util.MapUtil;

/**
 * 部门表控制器
 *
 * @author 
 * @Date 2019-01-25 16:44:42
 */
@Controller
@RequestMapping("/deptCopy")
public class DeptCopyController extends BaseController {

    private String PREFIX = "/treatment/deptCopy/";

    @Autowired
    private IDeptCopyService deptCopyService;

    /**
     * 跳转到部门表首页
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "deptCopy.html";
    }

    /**
     * 跳转到添加部门表
     */
    @RequestMapping("/deptCopy_add")
    public String deptCopyAdd() {
        return PREFIX + "deptCopy_add.html";
    }

    /**
     * 跳转到修改部门表
     */
    @RequestMapping("/deptCopy_update/{deptCopyId}")
    public String deptCopyUpdate(@PathVariable Integer deptCopyId, Model model) {
        DeptCopy deptCopy = deptCopyService.selectById(deptCopyId);
        model.addAttribute("item",deptCopy);
        LogObjectHolder.me().set(deptCopy);
        return PREFIX + "deptCopy_edit.html";
    }

    /**
     * 获取部门表列表
     */
    @RequestMapping(value = "/list")
    @ResponseBody
    public Object list(String condition, Integer offset, Integer limit) {
    	Wrapper<DeptCopy> wrapper = new EntityWrapper<>();
    	Page<Map<String, Object>> page = deptCopyService.selectMapsPage(new Page<>(offset, limit, Consts.DEFAULT_SORT_FIELD, Consts.DEFAULT_SORT_ORDER_IS_ASC), wrapper);
		return MapUtil.createSuccessMap("rows", page.getRecords(), "total", page.getTotal());
    }

    /**
     * 新增部门表
     */
    @RequestMapping(value = "/add")
    @ResponseBody
    public Object add(DeptCopy deptCopy) {
        Date createDate = new Date();
        deptCopy.setCreateDate(createDate);
        deptCopy.setUpdateDate(createDate);
        deptCopyService.insert(deptCopy);
        return SUCCESS_TIP;
    }

    /**
     * 删除部门表
     */
    @RequestMapping(value = "/delete")
    @ResponseBody
    public Object delete(@RequestParam Integer deptCopyId) {
        deptCopyService.deleteById(deptCopyId);
        return SUCCESS_TIP;
    }

    /**
     * 修改部门表
     */
    @RequestMapping(value = "/update")
    @ResponseBody
    public Object update(DeptCopy deptCopy) {
        deptCopy.setUpdateDate(new Date());
        deptCopyService.updateById(deptCopy);
        return SUCCESS_TIP;
    }

    /**
     * 部门表详情
     */
    @RequestMapping(value = "/detail/{deptCopyId}")
    @ResponseBody
    public Object detail(@PathVariable("deptCopyId") Integer deptCopyId) {
        return deptCopyService.selectById(deptCopyId);
    }
}
